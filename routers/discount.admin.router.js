const router = require('express').Router();
const discountAdminController = require('../controllers/discount.admin.controller.js');

router.get('/discount', discountAdminController.pageAdminDiscount);
router.post('/discount/create', discountAdminController.insertDiscount);
router.post('/discount/update', discountAdminController.updateDiscount);
router.post('/discount/delete', discountAdminController.removeDiscount);

module.exports = router;