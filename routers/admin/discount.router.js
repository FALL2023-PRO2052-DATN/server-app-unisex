const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const discountController = require('../../controllers/admin/discount.controller.js');

router.get('/discount', authMiddleware.signed, discountController.renderPageDiscount);
router.post('/discount', authMiddleware.signed, discountController.insertDiscount);
router.put('/discount/:discountID/update', authMiddleware.signed, discountController.updateDiscount);
router.put('/discount/:discountID/delete', authMiddleware.signed, discountController.removeDiscount);

module.exports = router;