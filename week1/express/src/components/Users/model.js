const { Schema, model, mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const connection = require('../../config/connection');

console.log(connection.MONGO_URI);

mongoose.connect('mongodb://localhost:27017/internshipOnix2022', (err) => {
    if (err) throw err;
});

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
    console.log(this.password);

    const hash = bcrypt.hashSync(this.password, 8);

    this.password = hash;

    next();

    return this;
});

module.exports = model('User', schema);
