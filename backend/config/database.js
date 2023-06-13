const Sequelize = require('sequelize');

const db = new Sequelize('nombre_base_de_datos', 'nombre_usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = db;
