const { Router } = require('express');
const userComponent = require('./index');

const router = Router();

router.post('/', userComponent.createUser);
router.get('/:id?', userComponent.findUsers);
router.put('/:id', userComponent.updateUser);
router.delete('/:id', userComponent.deleteUser);

module.exports = router;
