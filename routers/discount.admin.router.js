const router = require('express').Router();
const discountController = require('../controllers/discount.admin.controller.js');

router.get('/discount', discountController.pageDiscount);
router.post('/discount/create', discountController.insertDiscount);
router.post('/discount/update', discountController.updateDiscount);
router.post('/discount/delete', discountController.removeDiscount);

module.exports = router;