const { generateAcountValidationToken } = require('./token_generators/acountValidationToken')
const { generateResetPasswordToken } = require('./token_generators/resetPasswordToken')
const { emailHider } = require('./email_hIder/email_hider')

module.exports = {
  generateAcountValidationToken,
  generateResetPasswordToken,
  emailHider
}
