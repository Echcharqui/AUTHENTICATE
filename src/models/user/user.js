const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isNewUser: {
    type: Boolean,
    default: true
  },
  acountValidated: {
    type: Boolean,
    required: true,
    default: false
  },
  acountIsBanned: {
    type: Boolean,
    required: true,
    default: false
  },
  acountBanedUntil: {
    type: Date,
    required: true,
    default: null
  },
  refreshToken: {
    type: String,
    default: ''
  },
  acountConfirmationToken: {
    type: String,
    default: ''
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetEmailToken: {
    type: String,
    default: ''
  }

}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
