const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/product.controller');

router.get('/read-new-product', productController.readProductNew);
router.get('/read-outstanding-product', productController.readProductOutsanding);
router.get('/read-all-product', productController.readProductAll);
router.post('/read-byId-category-product', productController.readProductByIdDanhMuc);
router.post('/read-byId-product', productController.readProductByIdProduct);
router.post('/read-byId-product-size', productController.readSize_ProductByIdProduct);
router.post('/id/list/products', productController.readProductByListId);

module.exports = router;    