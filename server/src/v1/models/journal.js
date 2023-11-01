const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')


const journalSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        default: 'Untitled',
    },
    caption: {
        type: String,
        default: 'Write your caption here'
    },
    content: {
        type: String
    },
    date: {
        type: Date,
    },
    createdTime: {
        type: Date
    },
    editedTime: {
        type: Date
    },
    photo: {
        type: String
    },
    category: [{
        color: {
            type: String,
        },
        text: {
            type: String,
        },
    }],
}, schemaOptions)

module.exports = mongoose.model('Journal', journalSchema)