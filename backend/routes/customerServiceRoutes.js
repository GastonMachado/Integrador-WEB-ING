const express = require('express');
const customerServiceController = require('../controllers/customerServiceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/tickets', authMiddleware.authenticateToken, customerServiceController.getAllTickets);
router.post('/tickets', authMiddleware.authenticateToken, customerServiceController.createTicket);
router.get('/tickets/usuario/:userId', authMiddleware.authenticateToken, customerServiceController.getTicketsByUser);

module.exports = router;
