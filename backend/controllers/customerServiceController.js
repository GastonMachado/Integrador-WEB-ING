const db = require('../config/database');

// Obtener todos los tickets de servicio al cliente
const getAllTickets = async (req, res) => {
  try {
    const tickets = await db.query('SELECT * FROM tickets');
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener los tickets de servicio al cliente.' });
  }
};

// Crear un nuevo ticket de servicio al cliente
const createTicket = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    await db.query('INSERT INTO tickets (userId, title, description) VALUES (?, ?, ?)', [userId, title, description]);

    res.status(200).json({ message: 'Ticket de servicio al cliente creado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al crear el ticket de servicio al cliente.' });
  }
};

// Obtener los tickets de servicio al cliente de un usuario
const getTicketsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const tickets = await db.query('SELECT * FROM tickets WHERE userId = ?', [userId]);

    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener los tickets de servicio al cliente del usuario.' });
  }
};

module.exports = {
  getAllTickets,
  createTicket,
  getTicketsByUser
};
