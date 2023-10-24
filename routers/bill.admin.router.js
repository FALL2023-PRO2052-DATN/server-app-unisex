const router = require('express').Router();
const billAdminController = require('../controllers/bill.admin.controller.js');

router.get('/bill', billAdminController.pageAdminBill);
router.get('/bill/:id', billAdminController.pageBillDetail);
router.post('/bill/:id', billAdminController.confirmBill);
router.post('/bill/cancel-order/:id', billAdminController.cancelBill);

module.exports = router;