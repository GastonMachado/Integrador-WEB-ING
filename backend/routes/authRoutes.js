const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rutas de autenticación
router.post('/registro', authController.register);
router.post('/login', authController.login);

module.exports = router;
