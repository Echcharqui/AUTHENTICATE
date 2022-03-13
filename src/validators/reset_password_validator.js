const { body } = require('express-validator')

const resetPasswordValidator = () => {
  return [
    body('password').notEmpty().trim().isLength({ min: 6, max: 25 }).withMessage('password must be between 6 and 25 characters !'),
    body('passwordConfirmation').notEmpty().trim().custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password !')
      }
      return true
    })
  ]
}

module.exports = { resetPasswordValidator }
