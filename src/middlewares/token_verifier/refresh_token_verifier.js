require('dotenv').config()
const JWT = require('jsonwebtoken')
const { User, BlackListToken } = require('../../models')

const isTheRefreshTokenValid = (req, res, next) => {
  // extract the token from the header authorization field
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  // if the token dont exist send back a response with status 400
  if (!token) {
    return res.status(400).json({ errors: { msg: 'An access token is required in the process on this request !' } })
  }

  JWT.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN, async (error, user) => {
    // if the token is expired or invalid send back a response with status 401
    if (error) {
      return res.status(401).json({ errors: { msg: 'The access token is invalid or expired !', error } })
    }

    // check the refresh tokn is the same on this user record
    const theUser = await User.findById(user._id)
    if (!theUser) {
      return res.status(401).json({ errors: { msg: 'The access token is invalid or expired !', error } })
    }
    if (theUser.refreshToken !== token) {
      return res.status(401).json({ errors: { msg: 'The access token is invalid or expired !', error } })
    }

    // if the token is black listed send back a response with status 401
    const tokentBLackListed = await BlackListToken.findOne({ token: token })
    if (tokentBLackListed) {
      return res.status(401).json({ errors: { msg: 'The access token is invalid or expired !', error } })
    }

    // if the token is not an refresh token send back a response with status 401
    if (user.for !== 'refreshing the token') {
      return res.status(401).json({ errors: { msg: 'The access token is invalid or expired !', error } })
    }

    req.user = { ...user }

    next()
  })
}

module.exports = { isTheRefreshTokenValid }
