const uniqid = require('uniqid');

const Users = [
    {
        id: uniqid(),
        name: 'Vlad',
        age: 25,
    },
    {
        id: uniqid(),
        name: 'Kirill',
        age: 20,
    },
    {
        id: uniqid(),
        name: 'Igor',
        age: 35,
    },
];

module.exports = { Users };
