const router = require('express').Router();
const billAdminController = require('../controllers/bill.admin.controller.js');

router.get('/bill', billAdminController.pageAdminBill);

module.exports = router;