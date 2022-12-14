const User = require('./model');

function createUser(body) {
    const newUser = User({ ...body });

    return newUser.save();
}

function findUser(id) {
    return User.findById(id);
}

function findAllUsers() {
    return User.find();
}

function updateUser(id, body) {
    User.findByIdAndUpdate(id, body, (err, user) => {
        // eslint-disable-next-line no-param-reassign
        user.password = body.password;
        user.save();

        return user;
    });

    return User;
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
