const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.user.controlllers');

router.post('/read-address', addressController.readAddress);
router.post('/insert-address', addressController.insertAddress);
router.post('/update-address', addressController.updateAddress);
router.post('/delete-address', addressController.deleteAddress);

module.exports = router;  