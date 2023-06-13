const express = require('express');
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener recomendaciones de juegos para un usuario
router.get('/recommendations/:userId', authMiddleware.authenticateToken, recommendationController.getRecommendationsByUserId);

module.exports = router;
