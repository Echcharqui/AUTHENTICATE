const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
    required: true
  },
  bornDate: {
    type: Date,
    required: true,
    default: null
  }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = { Profile }
