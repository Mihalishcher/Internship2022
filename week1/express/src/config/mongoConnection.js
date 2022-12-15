const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const MONGODB_NAME = 'internshipOnix2022';
const MONGO_URI = `${MONGODB_URI}/${MONGODB_NAME}`;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = mongoose.createConnection(MONGO_URI, connectOptions);

connection.on('connected', () => {
    console.log('MongoDB connected!');
});
connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});
connection.on('error', (error) => {
    console.log(`MongoDB connection error: ${error}`);
});

module.exports = connection;
