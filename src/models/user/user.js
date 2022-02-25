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
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  bornDate: {
    type: Date,
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
    default: false
  },
  acountBanedUntil: {
    type: Date,
    default: null
  },
  refreshToken: {
    type: String,
    default: ''
  },
  acountValidationToken: {
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
