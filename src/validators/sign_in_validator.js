const { body } = require('express-validator')

const signInValidator = () => {
  return [
    body('email').notEmpty().trim().isEmail().normalizeEmail({ all_lowercase: true, gmail_remove_dots: false }).withMessage('the geving email is invalid !'),
    body('password').notEmpty().trim().isLength({ min: 6, max: 25 }).withMessage('password must be between 6 and 25 characters !')
  ]
}

module.exports = { signInValidator }
