const mongoose = require('mongoose')

const blackListSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const BlackListToken = mongoose.model('BlackListToken', blackListSchema)

module.exports = { BlackListToken }
