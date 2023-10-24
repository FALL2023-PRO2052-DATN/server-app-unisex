const router = require('express').Router();
const billAdminController = require('../controllers/bill.admin.controller.js');

router.get('/bill', billAdminController.pageAdminBill);
router.post('/bill/confirm-order/:id', billAdminController.confirmBillFromPageBillDetail);
router.post('/bill/cancel-order/:id', billAdminController.cancelBillFromPageBillDetail);

module.exports = router;