const router = require('express').Router();
const employeeAdminController = require('../controllers/employee.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/employee', authMiddleware.signed, employeeAdminController.pageAdminEmployee);
router.get('/employee/create',authMiddleware.signed, employeeAdminController.pageInsertEmployee);
router.post('/employee/create',authMiddleware.signed, employeeAdminController.insertEmployee);
router.post('/employee/delete',authMiddleware.signed, employeeAdminController.removeEmployee);

module.exports = router;