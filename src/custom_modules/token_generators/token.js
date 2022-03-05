require('dotenv').config()
const JWT = require('jsonwebtoken')

const generateToken = async (user, time) => {
  return JWT.sign({
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    for: 'authentication as a simple user'
  }, process.env.JWT_SECRET_TOKEN, { expiresIn: `${time}m` })
}

module.exports = { generateToken }
