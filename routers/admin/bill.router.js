const router = require('express').Router();
const billController = require('../../controllers/admin/bill.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/bill', authMiddleware.signed, billController.renderPageBill);
router.put('/bill/confirm-order/:id', authMiddleware.signed, billController.confirmBillFromPageBillDetail);
router.put('/bill/cancel-order/:id', authMiddleware.signed, billController.cancelBillFromPageBillDetail);

module.exports = router;