require('dotenv').config()
const JWT = require('jsonwebtoken')

const generateRefereshToken = async (user) => {
  return JWT.sign({
    _id: user._id,
    for: 'refreshing the token'
  }, process.env.JWT_SECRET_REFRESH_TOKEN)
}

module.exports = { generateRefereshToken }
