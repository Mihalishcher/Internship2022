const { Router } = require('express');
const userComponent = require('./index');
const validationMiddleware = require('../../config/validationMiddleware');
const schemas = require('./validation');
const JWTcheck = require('../../config/JWTmiddleware');

const router = Router();

router.get('/account', JWTcheck, userComponent.account);

router.post('/', validationMiddleware(schemas.createUser, 'body'), userComponent.createUser);

router.get('/:id', validationMiddleware(schemas.checkID, 'params'), userComponent.findUser);

router.put('/:id', validationMiddleware(schemas.createUser, 'body'), userComponent.updateUser);

router.patch('/:id', validationMiddleware(schemas.updateUser, 'body'), userComponent.updateUser);

router.delete('/:id', validationMiddleware(schemas.checkID, 'params'), userComponent.deleteUser);

router.post('/sign-in', validationMiddleware(schemas.signIn, 'body'), userComponent.signIn);

router.get('/', userComponent.findAllUsers);

module.exports = router;
