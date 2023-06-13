// Importar los módulos y dependencias necesarias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../database'); // Importa el archivo de configuración de la conexión a MySQL

// Registro de usuario
const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña } = req.body;

    // Verificar si el usuario ya está registrado
    const query = `SELECT * FROM usuarios WHERE correo = ?`;
    const usuarioExistente = await db.query(query, [correo]);

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Insertar el nuevo usuario en la base de datos
    const insertQuery = `INSERT INTO usuarios (nombre, apellido, correo, contraseña) VALUES (?, ?, ?, ?)`;
    await db.query(insertQuery, [nombre, apellido, correo, contraseñaHash]);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Verificar si el usuario existe en la base de datos
    const query = `SELECT * FROM usuarios WHERE correo = ?`;
    const usuario = await db.query(query, [correo]);

    if (usuario.length === 0) {
      return res.status(400).json({ error: 'El correo o la contraseña son incorrectos' });
    }

    // Verificar la contraseña
    const contraseñaCoincide = await bcrypt.compare(contraseña, usuario[0].contraseña);

    if (!contraseñaCoincide) {
      return res.status(400).json({ error: 'El correo o la contraseña son incorrectos' });
    }

    // Generar el token de autenticación
    const token = jwt.sign({ id: usuario[0].id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
  }
};

module.exports = { register, login };
