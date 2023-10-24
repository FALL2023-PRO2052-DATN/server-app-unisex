const router = require('express').Router();
const billDetailController = require('../controllers/bill-detail.admin.controller.js');

router.get('/bill-detail/:id', billDetailController.pageBillDetail);

module.exports = router;