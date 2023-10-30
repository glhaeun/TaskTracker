const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')


const boardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        default: 'Untitled',
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
    color: {
        type: String,
        default: 'black'
    }
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema)