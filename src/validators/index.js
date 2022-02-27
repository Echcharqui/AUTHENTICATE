const { signUpValidator } = require('./sign_up_validator')
const { resendEmailValidator } = require('./resend_email_Validator')
const { forgetPassword } = require('./forget_password')

module.exports = {
  signUpValidator,
  resendEmailValidator,
  forgetPassword
}
