const express = require('express');
const router = express.Router();
const productSizeController = require('../controllers/product-size.admin.controller.js');

router.get('/product-size', productSizeController.pageProductSize);
router.post('/product-size/delete', productSizeController.removeProductSize);
router.post('/product-size/update-quantity', productSizeController.updateQuantityProductSize)
module.exports = router;