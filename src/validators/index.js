const { signInValidator } = require('./sign_in_validator')
const { signUpValidator } = require('./sign_up_validator')
const { resendEmailValidator } = require('./resend_email_Validator')
const { forgetPassword } = require('./forget_password')
const { resetPasswordValidator } = require('./reset_password_validator')

module.exports = {
  signInValidator,
  signUpValidator,
  resendEmailValidator,
  forgetPassword,
  resetPasswordValidator
}
