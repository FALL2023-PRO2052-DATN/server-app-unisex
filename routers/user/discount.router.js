const express = require('express');
const router = express.Router();
const discountController = require('../../controllers/user/discount.controlller');

router.post('/read-byId-discount', discountController.readDiscountById);

router.get('/read/discounts', discountController.readDiscount);


module.exports = router;  