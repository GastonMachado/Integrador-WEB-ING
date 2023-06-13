const db = require('../config/database');

// Agregar un juego al carrito
const addToCart = async (req, res) => {
  try {
    const { gameId, userId } = req.body;

    // Verificar si el juego ya está en el carrito del usuario
    const existingCartItem = await db.query(
      'SELECT * FROM cart WHERE gameId = ? AND userId = ?',
      [gameId, userId]
    );

    if (existingCartItem.length > 0) {
      return res.status(400).json({ message: 'El juego ya está en el carrito.' });
    }

    // Agregar el juego al carrito
    await db.query('INSERT INTO cart (gameId, userId) VALUES (?, ?)', [gameId, userId]);

    res.status(200).json({ message: 'Juego agregado al carrito.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al agregar el juego al carrito.' });
  }
};

// Obtener el carrito de un usuario
const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await db.query(
      'SELECT cart.id, games.title, games.price FROM cart JOIN games ON cart.gameId = games.id WHERE cart.userId = ?',
      [userId]
    );

    res.status(200).json({ cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener el carrito.' });
  }
};

// Eliminar un juego del carrito
const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    await db.query('DELETE FROM cart WHERE id = ?', [cartId]);

    res.status(200).json({ message: 'Juego eliminado del carrito.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al eliminar el juego del carrito.' });
  }
};

module.exports = {
  addToCart,
  getCartByUser,
  removeFromCart
};
