require('dotenv').config()
const JWT = require('jsonwebtoken')

const generateAcountValidationToken = async (user) => {
  return JWT.sign({
    email: user.email,
    for: 'acount validation'
  }, process.env.JWT_SECRET_ACOUNT_VAVALIDATION, { expiresIn: '5m' })
}

module.exports = { generateAcountValidationToken }
