const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  isVerified: {
    type : Boolean ,
    required: true
  },
  verificationExpiresAt: {
    type: Date, 
    required: true,
  }
}, schemaOptions)

module.exports = mongoose.model('User', userSchema)