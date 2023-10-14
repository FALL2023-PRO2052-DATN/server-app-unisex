const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.admin.controller.js');

router.get('/product', productController.pageProduct);
router.get('/product/add', productController.pageAddProduct);
router.post('/product/add', productController.insertProduct);
router.post('/product/delete', productController.removeProduct);


module.exports = router;