const { body } = require('express-validator')

const signUpValidator = () => {
  return [
    body('email').notEmpty().trim().isEmail().normalizeEmail({ all_lowercase: true, gmail_remove_dots: false }).withMessage('the geving email is invalid !'),
    body('firstName').notEmpty().custom((value) => {
      // eslint-disable-next-line
      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
      if (format.test(value)) {
        throw new Error('fisrtName dont support special characters !')
      } else if (value.length < 5 || value.length > 25) {
        throw new Error('fisrtName must be between 5 and 25 characters !')
      }
      return true
    }),
    body('lastName').notEmpty().custom((value) => {
      // eslint-disable-next-line
      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
      if (format.test(value)) {
        throw new Error('LastName dont support special characters !')
      } else if (value.length < 5 || value.length > 25) {
        throw new Error('LastName must be between 5 and 25 characters !')
      }
      return true
    }),
    body('bornDate').notEmpty().custom((value) => {
      const over18years = new Date(`01/01/${new Date().getFullYear() - 18}`)
      const date = new Date(value)
      const isDate = Date.parse(date)
      if (!isDate) {
        throw new Error('invalid bornDate !')
      } else {
        if (over18years.getTime() < date.getTime()) {
          throw new Error('you dont have 18 years old !')
        }
        return true
      }
    }),
    body('gender').notEmpty().trim().isIn(['male', 'female', 'other']).withMessage('invalid gender !'),
    body('password').notEmpty().trim().isLength({ min: 6, max: 25 }).withMessage('password must be between 6 and 25 characters !'),
    body('passwordConfirmation').notEmpty().trim().custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password !')
      }
      return true
    }),
    body('acceptingTerms').notEmpty().isBoolean().custom((value) => {
      if (value !== true) {
        throw new Error('Accepting the terms and conditions is mandatory !')
      }
      return true
    })
  ]
}

module.exports = { signUpValidator }
