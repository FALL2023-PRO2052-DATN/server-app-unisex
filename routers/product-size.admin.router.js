const router = require('express').Router();
const productSizeController = require('../controllers/product-size.admin.controller.js');

router.get('/product-size', productSizeController.pageProductSize);
router.post('/product-size/create', productSizeController.insertProductSize);
router.post('/product-size/update', productSizeController.updateProductSize);
router.post('/product-size/update-quantity', productSizeController.updateQuantityProductSize);
router.post('/product-size/delete', productSizeController.removeProductSize);
router.post('/product-size/delete-for-update-product', productSizeController.removeProductSizeFromUpdateProduct);

module.exports = router;