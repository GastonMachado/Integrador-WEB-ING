const db = require('../config/database');

// Crea una nueva calificación para un juego
const createRating = (req, res) => {
  const { userId, gameId, rating } = req.body;
  // Inserta la calificación en la base de datos
  db.query('INSERT INTO ratings (user_id, game_id, rating) VALUES (?, ?, ?)', [userId, gameId, rating], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la calificación' });
    } else {
      res.status(201).json({ message: 'Calificación creada exitosamente', ratingId: result.insertId });
    }
  });
};

// Obtiene las calificaciones de un juego
const getRatingsByGameId = (req, res) => {
  const gameId = req.params.id;
  // Busca las calificaciones en la base de datos por el ID del juego
  db.query('SELECT * FROM ratings WHERE game_id = ?', gameId, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las calificaciones' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  createRating,
  getRatingsByGameId,
};
