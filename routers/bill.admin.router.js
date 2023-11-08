const router = require('express').Router();
const billAdminController = require('../controllers/bill.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/bill', authMiddleware.signed, billAdminController.pageAdminBill);
router.post('/bill/confirm-order/:id', authMiddleware.signed, billAdminController.confirmBillFromPageBillDetail);
router.post('/bill/cancel-order/:id', authMiddleware.signed, billAdminController.cancelBillFromPageBillDetail);

module.exports = router;