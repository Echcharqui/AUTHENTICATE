const { generateAcountValidationToken } = require('./token_generators/acountValidationToken')
const { emailHider } = require('./email_hIder/email_hider')

module.exports = {
  generateAcountValidationToken,
  emailHider
}
