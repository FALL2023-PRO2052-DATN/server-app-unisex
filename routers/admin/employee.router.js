const router = require('express').Router();
const employeeController = require('../../controllers/admin/employee.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/employee', authMiddleware.signed, employeeController.renderPageEmployee);
router.get('/employee/page-insert',authMiddleware.signed, employeeController.renderPageInserEmployee);
router.post('/employee',authMiddleware.signed, employeeController.insertEmployee);
router.put('/employee/:employeeID',authMiddleware.signed, employeeController.removeEmployee);

module.exports = router;