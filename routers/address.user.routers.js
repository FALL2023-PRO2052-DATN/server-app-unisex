const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.user.controlllers');

router.post('/read-address', addressController.readAddress);

module.exports = router;  