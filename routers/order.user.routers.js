const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.user.controlllers');

router.post('/insert-order', orderController.insertDonHang);
router.post('/insert-detail-order', orderController.insertDonHangDetail);

module.exports = router;  