const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos',
};

const pool = mysql.createPool(dbConfig);

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al obtener la conexión a la base de datos' });
      }

      connection.query('SELECT * FROM tokens WHERE token = ?', [token], (error, results) => {
        connection.release();

        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error al consultar la base de datos' });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: 'Token de autorización inválido' });
        }

        req.userId = userId;
        next();
      });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token de autorización inválido' });
  }
};

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '24h' });
};

module.exports = {
  authenticateToken,
  generateAccessToken,
};
