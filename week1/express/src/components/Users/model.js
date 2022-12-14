const { Schema, model, mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const connection = require('../../config/mongoConnection');

connection.on('connecting', () => {
    console.log("\x1b[31m", 'MongoDB conecting');
})

connection.on('error', (error) => {
    console.log("\x1b[31m", `MongoDB error: ${error}`);
})

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

schema.pre('save', function asd(next) {
    const hash = bcrypt.hashSync(this.password, 8);

    this.password = hash;

    next();

    return this;
});

module.exports = connection.model('User', schema);
