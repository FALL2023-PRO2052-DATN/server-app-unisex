const router = require('express').Router();
const employeeShipperController = require('../../controllers/shipper/employee.shipper.controller.js'); 

router.post('/login', employeeShipperController.login);
router.put('/update-password', employeeShipperController.updatePassword);
router.put('/update-profile', employeeShipperController.updateProfile);

module.exports = router;