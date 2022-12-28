const taskService = require('./service');

async function createTask(req, res) {
    try {
        const user = await taskService.createTask(req.body, req.user.id);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function getTasks(req, res) {
    try {
        const { page } = req.query;

        const totalTasks = await taskService.findTasks(req.user.id);
        const tasks = await taskService.findFiveTasks(req.user.id, page);

        return res.status(200).json({ tasks, totalTasks: totalTasks.length });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function updateTask(req, res) {
    try {
        const user = await taskService.updateTask(req.params.id, req.body);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function getAllUsersTasks(req, res) {
    try {
        const tasks = await taskService.getAllUsersTasks(req.user.id);

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    getAllUsersTasks,
};
