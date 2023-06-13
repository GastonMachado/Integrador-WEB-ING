const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.get('/games', gameController.getGames);
router.post('/games', gameController.createGame);
router.get('/games/:gameId', gameController.getGameById);
router.put('/games/:gameId', gameController.updateGame);
router.delete('/games/:gameId', gameController.deleteGame);

module.exports = router;
