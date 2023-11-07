const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')


const budgetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
    },
    color: {
        type: String,
    },
    amount: {
        type: Number
    },
    expenses:[
        {
            id: String,
            name: String,
            createdAt: Date,
            amount: Number,
            budgetId: {
                type: Schema.Types.ObjectId, 
                ref: 'Budget', 
            },
        }
    ],
}, schemaOptions)

module.exports = mongoose.model('Budget', budgetSchema)