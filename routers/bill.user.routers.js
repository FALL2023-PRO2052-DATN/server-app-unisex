const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.user.controlllers');

router.post('/read-byId-status-bill', billController.readBillByStatusId);
router.post('/cancel-bill', billController.cancelBill);
router.post('/read-detail-bill', billController.readBillById);
router.post('/read-comment-bill', billController.readBillByIdForComment);

module.exports = router;  