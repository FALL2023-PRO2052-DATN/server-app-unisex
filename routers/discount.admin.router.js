const router = require('express').Router();
const authMiddleware = require('../middleware/auth-middleware.js');
const discountAdminController = require('../controllers/discount.admin.controller.js');

router.get('/discount', authMiddleware.signed, discountAdminController.renderPageDiscount);
router.post('/discount/create', authMiddleware.signed, discountAdminController.insertDiscount);
router.post('/discount/update', authMiddleware.signed, discountAdminController.updateDiscount);
router.post('/discount/delete', authMiddleware.signed, discountAdminController.removeDiscount);

module.exports = router;