const express = require('express');
const http = require('http');

const DemoRouter = require('../components/Demo/router');
const UserRouter = require('../components/Users/router');
const TaskRouter = require('../components/Tasks/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/demo', DemoRouter);
        app.use('/v1/users', UserRouter);
        app.use('/v1/task', TaskRouter);

        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};
