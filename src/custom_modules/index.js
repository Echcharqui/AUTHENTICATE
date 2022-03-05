const { generateToken } = require('./token_generators/token')
const { generateRefereshToken } = require('./token_generators/refreshToken')
const { generateAcountValidationToken } = require('./token_generators/acountValidationToken')
const { generateResetPasswordToken } = require('./token_generators/resetPasswordToken')
const { emailHider } = require('./email_hIder/email_hider')

module.exports = {
  generateToken,
  generateRefereshToken,
  generateAcountValidationToken,
  generateResetPasswordToken,
  emailHider
}
