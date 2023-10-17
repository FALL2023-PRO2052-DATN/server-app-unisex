const router = require('express').Router();
const productController = require('../controllers/product.admin.controller.js');

router.get('/product', productController.pageAdminProduct);
router.get('/product/create', productController.pageAdminAddProduct);
router.post('/product/create', productController.insertProduct);
router.get('/product/update/:id', productController.pageAdminUpdateProduct);
router.post('/product/update', productController.updateProduct);
router.post('/product/delete', productController.removeProduct);

module.exports = router;