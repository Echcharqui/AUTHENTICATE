const { body } = require('express-validator')

const forgetPassword = () => {
  return [
    body('email').notEmpty().trim().isEmail().normalizeEmail({ all_lowercase: true, gmail_remove_dots: false }).withMessage('the geving email is invalid !')
  ]
}

module.exports = { forgetPassword }
