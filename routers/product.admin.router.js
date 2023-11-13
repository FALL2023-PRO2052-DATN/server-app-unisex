const router = require('express').Router();
const productController = require('../controllers/product.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/product', authMiddleware.signed, productController.renderPageProduct);
router.get('/product/create', authMiddleware.signed, productController.pageAdminAddProduct);
router.post('/product/create', authMiddleware.signed, productController.insertProduct);
router.get('/product/update/:id', authMiddleware.signed, productController.pageAdminUpdateProduct);
router.post('/product/update', authMiddleware.signed, productController.updateProduct);
router.post('/product/delete', authMiddleware.signed, productController.removeProduct);

module.exports = router;