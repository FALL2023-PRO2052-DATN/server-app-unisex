const router = require('express').Router();
const billDetailController = require('../controllers/bill-detail.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/bill-detail/:id', authMiddleware.signed, billDetailController.pageBillDetail);

module.exports = router;