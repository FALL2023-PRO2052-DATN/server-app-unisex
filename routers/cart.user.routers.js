const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.user.controlllers');

router.get('/read-cart', cartController.readCart);
router.post('/insert-cart', cartController.insertCart);

module.exports = router;  