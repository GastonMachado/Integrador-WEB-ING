const db = require('../config/database');

// Obtiene las recomendaciones de juegos para un usuario
const getRecommendationsByUserId = (req, res) => {
  const userId = req.params.id;
  
  // Realiza una consulta a la base de datos para obtener las compras del usuario
  db.query('SELECT game_id FROM purchases WHERE user_id = ?', userId, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las compras del usuario' });
    } else {
      const purchasedGames = results.map((row) => row.game_id);
      
      // Realiza una consulta adicional para obtener las recomendaciones
      db.query(
        `SELECT * FROM games 
        WHERE genre IN (
          SELECT genre FROM games 
          WHERE id IN (?)
        )
        AND id NOT IN (?)
        LIMIT 5`,
        [purchasedGames, purchasedGames],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las recomendaciones' });
          } else {
            res.status(200).json(results);
          }
        }
      );
    }
  });
};

module.exports = {
  getRecommendationsByUserId,
};
