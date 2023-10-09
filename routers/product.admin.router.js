const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.admin.controller.js');

router.get('/product', productController.pageProduct);

module.exports = router;