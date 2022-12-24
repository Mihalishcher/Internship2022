const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('./service');
const config = require('../../config/authConfig');

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function findUser(req, res) {
    try {
        const user = await userService.findUser(req.params.id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function findAllUsers(req, res) {
    try {
        const user = await userService.findAllUsers();

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await userService.deleteUser(req.params.id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function signIn(req, res) {
    try {
        const user = await userService.signIn(req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 9000 });

        return res.status(200).json({ id: user.id, token });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function account(req, res) {
    try {
        return res.status(200).json({ message: 'Permissions granted' });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

module.exports = {
    createUser,
    findUser,
    findAllUsers,
    updateUser,
    deleteUser,
    signIn,
    account,
};
