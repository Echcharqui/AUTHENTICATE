const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  isNewUser: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    default: ''
  },
  tokenConfirmationEmail: {
    type: String,
    default: ''
  },
  tokenResetPassword: {
    type: String,
    default: ''
  },
  tokenResetEmail: {
    type: String,
    default: ''
  }

}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
