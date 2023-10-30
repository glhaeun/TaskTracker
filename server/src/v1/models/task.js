const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')


const taskSchema = new Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    desc: {
        type: String,
        default: ''
    },
    position: {
        type: Number
    },
    labels: [{
        color: {
            type: String,
        },
        text: {
            type: String,
        },
    }],
    date: {
        type: Date,
    },
    subtasks: [
        {
            id: String, // or ObjectId, or any appropriate type
            title: String,
            isCompleted: Boolean
        }
    ],
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)