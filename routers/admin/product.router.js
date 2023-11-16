const router = require('express').Router();
const productController = require('../../controllers/admin/product.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/product', authMiddleware.signed, productController.renderPageProduct);
router.get('/product/page-insert', authMiddleware.signed, productController.renderPageInsertProduct);
router.get('/product/:productID', authMiddleware.signed, productController.renderPageUpdateProduct);
router.post('/product', authMiddleware.signed, productController.insertProduct);
router.put('/product/:productID/update', authMiddleware.signed, productController.updateProduct);
router.put('/product/:productID/delete', authMiddleware.signed, productController.removeProduct);

module.exports = router;