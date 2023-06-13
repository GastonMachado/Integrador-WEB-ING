const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const cartRoutes = require('./routes/cartRoutes');
const customerServiceRoutes = require('./routes/customerServiceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/games', gameRoutes);
app.use('/cart', cartRoutes);
app.use('/customer-service', customerServiceRoutes);
app.use('/payment', paymentRoutes);
app.use('/rating', ratingRoutes);
app.use('/recommendation', recommendationRoutes);
