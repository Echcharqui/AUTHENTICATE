/// ////////////////////////////////////// security route //////////////////////////////////////////////////////
require('dotenv').config()
const router = require('express').Router()

/// /////////////// midlewares /////////////////////////
const { isTheRefreshTokenValid } = require('../../middlewares')
/// ////////////////////////////////////////////////////

/// /////////////// custom modules /////////////////////////
const {
  generateToken
} = require('../../custom_modules')
/// ////////////////////////////////////////////////////

/// /////////////// DB models /////////////////////////
const { User } = require('../../models')
/// ////////////////////////////////////////////////////

// refreshToken route
router.post('/refresh_token', isTheRefreshTokenValid, async (req, res) => {
  try {
    // searching this user by email recived on the request body
    let theUser = await User.findById(req.user._id)
    if (!theUser) {
      return res.status(404).json({ errors: { msg: 'This user dont exit !' } })
    }

    const theToken = await generateToken(theUser, 1)

    // set the user object
    theUser = {
      isAuth: true,
      email: theUser.email,
      firstName: theUser.firstName,
      lastName: theUser.lastName,
      isNewUser: theUser.isNewUser,
      token: theToken,
      refreshToken: theUser.refreshToken
    }

    return res.status(201).json(theUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: { msg: 'Something went wrong while processing on your request ! please try later ...' } })
  }
})

module.exports = router
