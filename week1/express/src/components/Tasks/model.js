const { Schema } = require('mongoose');
const connection = require('../../config/mongoConnection');

const schema = new Schema({
    assignee: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    estimatedTime: {
        type: Number,
        trim: true,
        required: true,
    },
    createdBy: {
        type: String,
        trim: true,
        required: true,
    },
});

module.exports = connection.model('Task', schema);
