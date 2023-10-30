const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')


const subTaskSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, schemaOptions)

module.exports = mongoose.model('SubTask', subTaskSchema)