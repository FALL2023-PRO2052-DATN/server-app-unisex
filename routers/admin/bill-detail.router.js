const router = require('express').Router();
const billDetailController = require('../../controllers/admin/bill-detail.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/bill-detail/:id', authMiddleware.signed, billDetailController.pageBillDetail);

module.exports = router;