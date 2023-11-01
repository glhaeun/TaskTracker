const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: '',
    },
    tags: [
        {
            tag: {
                type: String,
            },
            id: {
                type: String, 
            },
        },
    ],
    color: {
        type: String,
    },
    priority: {
        type: String,
    },
    isPinned: {
        type: Boolean,
    },
    isRead: {
        type: Boolean,
    },
    isArchive: {
        type: Boolean,
    },
    isDeleted: {
        type: Boolean,
    },
    date: {
        type: String,
    },
    createdTime: {
        type: Number, // Store as timestamp
    },
    editedTime: {
        type: Number, // Store as timestamp
    },
    id: {
        type: String, // or ObjectId, or any appropriate type
        required: true,
    },
}, schemaOptions);

module.exports = mongoose.model('Note', noteSchema);
