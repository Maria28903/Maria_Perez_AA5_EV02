const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdUserDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('user', userSchema)