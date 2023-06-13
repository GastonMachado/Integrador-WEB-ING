const db = require('../config/database');

// Obtener todos los juegos
const getGames = (req, res) => {
  db.query('SELECT * FROM games', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los juegos' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener un juego por su ID
const getGameById = (req, res) => {
  const gameId = req.params.id;
  db.query('SELECT * FROM games WHERE id = ?', gameId, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el juego' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Juego no encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Crear un nuevo juego
const createGame = (req, res) => {
  const { title, description, price } = req.body;
  db.query('INSERT INTO games (title, description, price) VALUES (?, ?, ?)', [title, description, price], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el juego' });
    } else {
      res.status(201).json({ message: 'Juego creado exitosamente', gameId: result.insertId });
    }
  });
};

// Actualizar un juego
const updateGame = (req, res) => {
  const gameId = req.params.id;
  const { title, description, price } = req.body;
  db.query('UPDATE games SET title = ?, description = ?, price = ? WHERE id = ?', [title, description, price, gameId], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el juego' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Juego no encontrado' });
    } else {
      res.status(200).json({ message: 'Juego actualizado exitosamente' });
    }
  });
};

// Eliminar un juego
const deleteGame = (req, res) => {
  const gameId = req.params.id;
  db.query('DELETE FROM games WHERE id = ?', gameId, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el juego' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Juego no encontrado' });
    } else {
      res.status(200).json({ message: 'Juego eliminado exitosamente' });
    }
  });
};

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
