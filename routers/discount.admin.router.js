const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discount.admin.controller.js');

router.get('/discount', discountController.pageDiscount);
router.post('/discount/add', discountController.create);
router.post('/discount/update', discountController.update);
router.post('/discount/delete', discountController.remove);

module.exports = router;