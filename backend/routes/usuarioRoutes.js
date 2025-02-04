const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const validateUser = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', UsuarioController.getUsers);
router.get('/:id', UsuarioController.getUserById);
router.post('/', validateUser, UsuarioController.createUser);
router.delete('/:id', UsuarioController.deleteUser);

module.exports = router;
