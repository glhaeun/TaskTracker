const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const userPasswordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  uniqueString: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, 
    required: true,
  },
  expiresAt: {
    type: Date, 
    required: true,
  }
}, schemaOptions)

module.exports = mongoose.model('UserPassword', userPasswordSchema)