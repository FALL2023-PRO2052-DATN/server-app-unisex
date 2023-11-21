const router = require('express').Router();
const productSizeController = require('../../controllers/admin/product-size.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/product-size', authMiddleware.signed, productSizeController.renderPageProductSize);
router.post('/product-size', authMiddleware.signed, productSizeController.insertProductSize);
router.put('/product-size/:productSizeID', authMiddleware.signed, productSizeController.updateProductSize);
router.delete('/product-size/:productSizeID', authMiddleware.signed, productSizeController.removeProductSize);

module.exports = router;