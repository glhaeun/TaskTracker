const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
        default: false,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
    },
    createdTime: {
        type: Number, // Store as timestamp
    },
    editedTime: {
        type: Number, // Store as timestamp
    }
}, schemaOptions);

module.exports = mongoose.model('Note', noteSchema);



