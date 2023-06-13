const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Ruta para crear un pago
router.post('/pago', paymentController.createPayment);

// Ruta para obtener un pago por ID
router.get('/pago/:paymentId', paymentController.getPaymentById);

// Ruta para procesar el pago
router.post('/pago', paymentController.processPayment);

module.exports = router;
