const router = require('express').Router();
const productController = require('../controllers/product.admin.controller.js');

router.get('/product', productController.pageProduct);
router.get('/product/create', productController.pageAddProduct);
router.post('/product/create', productController.insertProduct);
router.get('/product/update/:id', productController.pageUpdateProduct);
router.post('/product/update', productController.updateProduct);
router.post('/product/delete', productController.removeProduct);

module.exports = router;