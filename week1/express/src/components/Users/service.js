const bcrypt = require('bcryptjs');
const User = require('./dbModel');

function createUser(body) {
    const password = bcrypt.hashSync(body.password, 8);
    const newUser = User({ ...body, password });

    return newUser.save();
}

function findUser(id) {
    return User.findById(id);
}

function findAllUsers() {
    return User.find();
}

function updateUser(id, body) {
    return User.findByIdAndUpdate(id, body);
}

function deleteUser(id) {
    return User.findByIdAndDelete(id);
}

function signIn(body) {
    return User.findOne({ email: body.email });
}

module.exports = {
    createUser,
    findUser,
    findAllUsers,
    updateUser,
    deleteUser,
    signIn,
};
