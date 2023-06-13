const express = require('express');
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para agregar una calificación a un juego
router.post('/games/:gameId/ratings', authMiddleware.authenticateToken, ratingController.createRating);

// Ruta para obtener todas las calificaciones de un juego
router.get('/games/:gameId/ratings', ratingController.getRatingsByGameId);

module.exports = router;
