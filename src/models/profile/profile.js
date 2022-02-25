const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
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
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  bornDate: {
    type: Date,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  lastConection: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = { Profile }
