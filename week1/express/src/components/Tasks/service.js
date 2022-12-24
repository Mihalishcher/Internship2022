const mongoose = require('mongoose');
const Task = require('./model');
// const User = require('../Users/model');

function createTask(body, userID) {
    const newTask = Task({ ...body, assignee: userID });

    return newTask.save();
}

function findTasks(userID) {
    return Task.find({ assignee: userID });
}

function updateTask(id, body) {
    return Task.findByIdAndUpdate(id, body);
}

function getAllUsersTasks(userID) {
    // return User.aggregate([
    //     {
    //         $match: {
    //             _id: new mongoose.Types.ObjectId(userID),
    //         },
    //     }, {
    //         $lookup: {
    //             from: 'tasks',
    //             localField: '_id',
    //             foreignField: 'assignee',
    //             as: 'tasks',
    //             pipeline: [
    //                 {
    //                     $sort: { estimatedTime: -1 },
    //                 },
    //             ],
    //         },
    //     }, {
    //         $project: {
    //             name: { $concat: ['$firstName', ' ', '$lastName'] },
    //             tasks: 1,
    //             _id: 0,
    //             totalTasks: { $size: '$tasks' },
    //             totalEstimation: { $sum: '$tasks.estimatedTime' },
    //         },
    //     },
    // ]);
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
    updateTask,
    getAllUsersTasks,
};
