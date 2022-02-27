/// ////////////////////////////////////// auth route //////////////////////////////////////////////////////
require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

/// /////////////// custom modules /////////////////////////
const { generateAcountValidationToken, generateResetPasswordToken, emailHider } = require('../../custom_modules')
/// ////////////////////////////////////////////////////

/// /////////////// midlewares /////////////////////////
const { rateLimiter4on1, rateLimiter1on1, isTheAcountValidationTokenValid } = require('../../middlewares')
/// ////////////////////////////////////////////////////

/// /////////////// validators /////////////////////////
const { signUpValidator, resendEmailValidator, forgetPassword } = require('../../validators')
/// ////////////////////////////////////////////////////

/// /////////////// DB models /////////////////////////
const { User, BlackListToken } = require('../../models')
/// ////////////////////////////////////////////////////

// sign in route
router.get('/signIn', rateLimiter4on1, async (req, res) => {
  return res.status(200).json({ message: 'welcom to the sign in !' })
})

// sign up route
router.post('/signUp', rateLimiter4on1, signUpValidator(), async (req, res) => {
  // check validation inputs
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // check the email giving in the request exist
  const thisEmailExiste = await User.findOne({ email: req.body.email })
  if (thisEmailExiste) {
    return res.status(400).json({
      errors: {
        value: `${req.body.email}`,
        msg: 'This email is already in use !',
        param: 'email',
        location: 'body'
      }
    })
  }
  // check if the username is unique
  const firstNameExiste = await User.findOne({ firstName: { $regex: new RegExp('^' + req.body.firstName.toLowerCase(), 'i') } })
  if (firstNameExiste) {
    return res.status(400).json({
      errors: {
        value: `${req.body.firstName}`,
        msg: 'This firstName is already in use ! !',
        param: 'firstName',
        location: 'body'
      }
    })
  }
  // check if the username is unique
  const lastNameExiste = await User.findOne({ lastName: { $regex: new RegExp('^' + req.body.lastName.toLowerCase(), 'i') } })
  if (lastNameExiste) {
    return res.status(400).json({
      errors: {
        value: `${req.body.lastName}`,
        msg: 'This lastName is already in use ! !',
        param: 'lastName',
        location: 'body'
      }
    })
  }

  // recording process ...
  try {
    // generate the acount validation token
    const acountValidationToken = await generateAcountValidationToken({ email: `${req.body.email}` })

    // encrypted the password
    const encryptedPassword = await bcrypt.hashSync(req.body.password, 12)

    // create the user
    const newUser = new User({
      email: `${req.body.email}`,
      firstName: `${req.body.firstName}`,
      lastName: `${req.body.lastName}`,
      gender: `${req.body.gender}`,
      bornDate: `${req.body.bornDate}`,
      password: `${encryptedPassword}`,
      acountValidationToken: `${acountValidationToken}`
    })

    // sending the email
    console.log('an email is sent')

    // recorde the user on the DB
    await newUser.save()

    return res.status(201).json('Thanks for signing up 🙏. check your email to complete your registration !')
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: { message: 'Something went wrong while processing on your request ! please try later ...' } })
  }
})

// acount validation route
router.post('/acount_validation', isTheAcountValidationTokenValid, async (req, res) => {
  // find the acount
  let theAcount = await User.findOne({ email: req.user.email })

  // if this acount dont exit
  if (!theAcount) {
    return res.status(500).json({ errors: { message: 'Something went wrong while processing on your request ! please try later ...' } })
  }

  // check if the account not validated yet so start the acount validation process
  if (!theAcount.acountValidated) {
    try {
      // black listing the token
      await BlackListToken.insertMany([{
        token: theAcount.acountValidationToken
      }])

      // update the acount to become a validated one
      theAcount = await User.findOneAndUpdate({ email: req.user.email }, { acountValidated: true, acountValidationToken: '' }, { new: true })

      return res.status(201).json('Thanks for choosing us 🙏, your account has been validated successfully. you can login now 👍')
    } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: { message: 'Something went wrong while processing on your request ! please try later ...' } })
    }
  } else {
    // check if the account is already validated return a response with status 409 which mean that this request is no longer required
    return res.status(409).json({ errors: { message: 'This account is already validated ! please try to loging now.' } })
  }
})

// resend_acount_validation_email
router.post('/resend_account_validation_email', rateLimiter1on1, resendEmailValidator(), async (req, res) => {
  // check validation inputs
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // find the acount
  let theAcount = await User.findOne({ email: req.body.email })

  // if this acount exit
  if (!theAcount) {
    return res.status(400).json({
      errors: {
        value: `${req.body.email}`,
        msg: 'There is no account registered with this email address !',
        param: 'email',
        location: 'body'
      }
    })
  }

  // check if the account not validated yet so start the acount validation process
  if (!theAcount.acountValidated) {
    try {
      // black listing the token
      await BlackListToken.insertMany([{
        token: theAcount.acountValidationToken
      }])

      // generate a new token
      const theNewToken = await generateAcountValidationToken(req.body)

      // update the acount by updating the acountValidationToken field of this acount
      theAcount = await User.findOneAndUpdate({ email: req.body.email }, { acountValidationToken: theNewToken }, { new: true })

      // send the new email
      console.log('new validation email is sent successfully')

      // hide email
      const hidingEmail = await emailHider(`${req.body.email}`)

      return res.status(201).json(`A new account email validation has been sent 📨 to the email adresse : ${hidingEmail} !`)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: { message: 'Something went wrong while processing on your request ! please try later ...' } })
    }
  } else {
    // check if the account is already validated return a response with status 409 which mean that this request is no longer required
    return res.status(409).json({ errors: { message: 'This account is already validated ! please try to loging now.' } })
  }
})

// forgetPassword route
router.post('/forget_password', rateLimiter1on1, forgetPassword(), async (req, res) => {
  // check validation inputs
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // find the acount
  let theAcount = await User.findOne({ email: req.body.email })

  // if this acount exit
  if (!theAcount) {
    return res.status(400).json({
      errors: {
        value: `${req.body.email}`,
        msg: 'There is no account registered with this email address !',
        param: 'email',
        location: 'body'
      }
    })
  }

  // check if the account not validated yet so start the acount validation process
  if (theAcount.acountValidated) {
    try {
      // check if the user alredy sent a similar request by checking the resetPasswordToken field in the of this acount
      if (theAcount.resetPasswordToken.lenghth > 0) {
        // black listing the token
        await BlackListToken.insertMany([{
          token: theAcount.resetPasswordToken
        }])
      }

      // generate a new token
      const theNewToken = await generateResetPasswordToken(req.body)

      // update the acount by updating the resetPasswordToken field of this account
      theAcount = await User.findOneAndUpdate({ email: req.body.email }, { resetPasswordToken: theNewToken }, { new: true })

      // send the new email
      console.log('new reset password email is sent successfully')

      // hide email
      const hidingEmail = await emailHider(`${req.body.email}`)

      return res.status(201).json(`A new reset password email has been sent 📨 to the email adresse : ${hidingEmail} !`)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: { message: 'Something went wrong while processing on your request ! please try later ...' } })
    }
  } else {
    // check if the account is already validated return a response with status 403 which mean that this request required a validated token
    return res.status(403).json({ errors: { message: 'This request requires a validated account which is not your case ! please validate your account first !' } })
  }
})

// log out route
router.get('/logOut', async (req, res) => {
  return res.status(200).json({ message: 'welcom to the log out !' })
})

module.exports = router
