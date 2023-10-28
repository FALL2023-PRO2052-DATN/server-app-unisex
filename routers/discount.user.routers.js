const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discount.user.controlllers');

router.post('/read-byId-discount', discountController.readDiscountById);

module.exports = router;  