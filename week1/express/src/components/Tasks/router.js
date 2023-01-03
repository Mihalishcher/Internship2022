const { Router } = require('express');
const taskComponent = require('./index');
const validationMiddleware = require('../../config/validationMiddleware');
const schemas = require('./validation');
const JWTcheck = require('../../config/JWTmiddleware');

const router = Router();

router.get('/', JWTcheck, taskComponent.getTasks);

router.post('/', JWTcheck, validationMiddleware(schemas.createTask, 'body'), taskComponent.createTask);

router.patch('/:id', JWTcheck, validationMiddleware(schemas.updateTask, 'body'), taskComponent.updateTask);

router.delete('/:id', JWTcheck, validationMiddleware(schemas.checkID, 'params'), taskComponent.deleteTask);

router.delete('/', JWTcheck, taskComponent.deleteAllTasks);

router.get('/all', JWTcheck, taskComponent.getAllUsersTasks);

module.exports = router;
