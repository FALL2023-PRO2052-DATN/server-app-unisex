const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.admin.controller.js');

router.get('/product', productController.pageProduct);
router.get('/product/add', productController.pageAddProduct);
router.post('/product/add', productController.insertProduct);
router.post('/product/add-size', productController.insertProductSize);
router.get('/product/update/:id', productController.pageUpdateProduct);
router.post('/product/update', productController.updateProduct);
router.post('/product/update-size', productController.updateProductSize);
router.post('/product/delete', productController.removeProduct);
router.post('/product/delete-size', productController.removeProductSize);


module.exports = router;