const uniqid = require('uniqid');
const DB = require('./usersDB');

let usersDB = DB.Users;

function createUser({ name = 'Some name', age = 'Some age' }) {
    const newUser = {
        id: uniqid(),
        name,
        age,
    };

    usersDB.push(newUser);

    return newUser;
}

function findUsers(id) {
    if (!id) {
        return usersDB;
    }

    const oneUser = usersDB.find((user) => user.id === id);

    if (!oneUser) {
        throw new Error('No such user');
    }

    return oneUser;
}

function updateUser(id, { name, age }) {
    const updatedUser = findUsers(id);

    updatedUser.name = name || updatedUser.name;
    updatedUser.age = age || updatedUser.age;

    usersDB = usersDB.map((user) => (user.id === id ? updatedUser : user));

    return updatedUser;
}

function deleteUser(id) {
    const deletedUser = findUsers(id);

    usersDB = usersDB.filter((user) => user.id !== id);

    return deletedUser;
}

module.exports = {
    createUser,
    findUsers,
    updateUser,
    deleteUser,
};
