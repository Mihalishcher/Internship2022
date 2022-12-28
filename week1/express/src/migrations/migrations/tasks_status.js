module.exports = {

    async up(db) {
        const tasks = db.collection('tasks');

        await tasks.updateMany({ estimatedTime: { $lte: 10 } }, { $set: { ststus: 'Done' } });
        await tasks.updateMany({ estimatedTime: { $gt: 10 } }, { $set: { ststus: 'In progress' } });
    },

    async down(db) {
        const tasks = db.collection('tasks');

        await tasks.updateMany({}, { $unset: { ststus: true } });
    },
};
