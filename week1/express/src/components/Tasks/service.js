const mongoose = require('mongoose');
const Task = require('./model');

function createTask(body, userID) {
    const newTask = Task({ ...body, assignee: userID });

    return newTask.save();
}

function findTasks(userID) {
    return Task.find({ assignee: userID });
}

function findFiveTasks(userID, page) {
    return Task.find({ assignee: userID }).skip(5 * page).limit(5);
}

function updateTask(id, body) {
    return Task.findByIdAndUpdate(id, body);
}

function getAllUsersTasks(userID) {
    return Task.aggregate([
        {
            $match: {
                assignee: new mongoose.Types.ObjectId(userID),
            },
        }, {
            $sort: {
                estimatedTime: -1,
            },
        }, {
            $group: {
                _id: { _id: '$assignee' },
                tasks: {
                    $push: {
                        _id: '$_id',
                        assignee: '$assignee',
                        title: '$title',
                        description: '$description',
                        estimatedTime: '$estimatedTime',
                        createdBy: '$createdBy',
                    },
                },
            },
        }, {
            $lookup: {
                localField: 'tasks.assignee',
                from: 'users',
                foreignField: '_id',
                as: 'user',
            },
        }, {
            $unwind: {
                path: '$user',
            },
        }, {
            $project: {
                _id: 0,
                name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                tasks: 1,
                totalTasks: { $size: '$tasks' },
                totalEstimation: { $sum: '$tasks.estimatedTime' },
            },
        },
    ]);
}

module.exports = {
    createTask,
    findTasks,
    findFiveTasks,
    updateTask,
    getAllUsersTasks,
};
