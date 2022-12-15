/* eslint-disable no-underscore-dangle */
const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');
const connection = require('../../config/mongoConnection');

const schema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    birthYear: {
        type: Number,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
});

function hashPassword(next) {
    if (this._update && this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    } else if (this.password) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
}

schema.pre('save', hashPassword);
schema.pre('findOneAndUpdate', hashPassword);

module.exports = connection.model('User', schema);
