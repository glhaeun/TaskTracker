const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')


const calendarSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
      start: {
        type: Date,
        required: true,
    },
      end: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    allDay: {
      type: Boolean,
    },
    color: {
      type: String,
    }
}, schemaOptions)

module.exports = mongoose.model('Calendar', calendarSchema)