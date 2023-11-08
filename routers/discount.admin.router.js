const router = require('express').Router();
const discountAdminController = require('../controllers/discount.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/discount', authMiddleware.signed, discountAdminController.pageAdminDiscount);
router.post('/discount/create', authMiddleware.signed, discountAdminController.insertDiscount);
router.post('/discount/update', authMiddleware.signed, discountAdminController.updateDiscount);
router.post('/discount/delete', authMiddleware.signed, discountAdminController.removeDiscount);

module.exports = router;