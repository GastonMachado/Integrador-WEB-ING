const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/carrito/:userID', authMiddleware.authenticateToken, cartController.getCartByUser);
router.post('/carrito/agregar/:juegoId', authMiddleware.authenticateToken, cartController.addToCart);
router.delete('/carrito/eliminar/:juegoId', authMiddleware.authenticateToken, cartController.removeFromCart);

module.exports = router;
