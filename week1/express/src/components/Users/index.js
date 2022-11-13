const userService = require('./service');

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function findUsers(req, res) {
    try {
        const user = await userService.findUsers(req.params.id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
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
            details: null,
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
            details: null,
        });
    }
}

module.exports = {
    createUser,
    findUsers,
    updateUser,
    deleteUser,
};
