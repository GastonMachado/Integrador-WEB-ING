const db = require('../config/database');

// Crea un nuevo pago
const createPayment = (req, res) => {
  const { userId, gameId, paymentMethod } = req.body;
  // Inserta los datos del pago en la base de datos
  db.query('INSERT INTO payments (user_id, game_id, payment_method) VALUES (?, ?, ?)', [userId, gameId, paymentMethod], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el pago' });
    } else {
      res.status(201).json({ message: 'Pago creado exitosamente', paymentId: result.insertId });
    }
  });
};

// Obtiene un pago por ID
const getPaymentById = (req, res) => {
  const paymentId = req.params.id;
  // Busca el pago en la base de datos por su ID
  db.query('SELECT * FROM payments WHERE id = ?', paymentId, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el pago' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Pago no encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Función para procesar el pago
async function processPayment(req, res) {
  try {
    // Obtener los datos del pago desde la solicitud
    const { paymentId, amount, userId } = req.body;

    // Aquí puedes realizar la lógica para procesar y validar el pago
    // Por ejemplo, verificar el estado del pago, verificar el monto, asociar el pago al usuario, etc.

    // Verificar si el pago ya ha sido procesado anteriormente
    const checkQuery = 'SELECT * FROM payments WHERE id = ?';
    const checkResult = await db.query(checkQuery, [paymentId]);

    if (checkResult.length > 0) {
      return res.status(400).json({ error: 'El pago ya ha sido procesado anteriormente' });
    }

    // Verificar si el monto del pago es correcto
    if (amount !== 100) {
      return res.status(400).json({ error: 'El monto del pago es incorrecto' });
    }

    // Asociar el pago al usuario
    const updateQuery = 'UPDATE payments SET status = ?, user_id = ? WHERE id = ?';
    const params = ['procesado', userId, paymentId];

    // Ejecutar la consulta de actualización
    await db.query(updateQuery, params);

    // Responder con una confirmación
    res.status(200).json({ message: 'Pago procesado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
}

module.exports = {
  createPayment,
  getPaymentById,
  processPayment,
};
