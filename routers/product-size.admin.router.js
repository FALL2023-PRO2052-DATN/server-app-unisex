const router = require('express').Router();
const productSizeController = require('../controllers/product-size.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/product-size', authMiddleware.signed, productSizeController.pageAdminProductSize);
router.post('/product-size/create', authMiddleware.signed, productSizeController.insertProductSize);
router.post('/product-size/update', authMiddleware.signed, productSizeController.updateProductSize);
router.post('/product-size/update-quantity', authMiddleware.signed, productSizeController.updateQuantityProductSize);
router.post('/product-size/delete', authMiddleware.signed, productSizeController.removeProductSize);
router.post('/product-size/delete-for-update-product', authMiddleware.signed, productSizeController.removeProductSizeFromUpdateProduct);

module.exports = router;