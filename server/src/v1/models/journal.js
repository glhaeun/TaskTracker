const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const journalSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: Object,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  tag: {
    type : [String]
  },
  categories: {
    type: String
  }
}, schemaOptions)

module.exports = mongoose.model('Journal', journalSchema)