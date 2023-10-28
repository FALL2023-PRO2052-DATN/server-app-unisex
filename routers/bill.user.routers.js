const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.user.controlllers');

router.post('/read-byId-status-bill', billController.readBillByStatusId);

module.exports = router;  