require('dotenv').config()
const JWT = require('jsonwebtoken')

const generateResetPasswordToken = async (user) => {
  return JWT.sign({
    email: user.email,
    for: 'reset password'
  }, process.env.JWT_SECRET_RESET_PASSWORD, { expiresIn: '5m' })
}

module.exports = { generateResetPasswordToken }
