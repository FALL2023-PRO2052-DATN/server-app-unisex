const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/product.user.controllers');

router.get('/read-new-product', productController.readProductNew);
router.get('/read-outstanding-product', productController.readProductOutsanding);
router.get('/read-all-product', productController.readProductAll);
router.post('/read-byId-category-product', productController.readProductByIdDanhMuc);
router.post('/read-byId-product', productController.readProductByIdProduct);
router.post('/read-byId-product-size', productController.readSize_ProductByIdProduct);

module.exports = router;    