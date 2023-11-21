const router = require('express').Router();
const overviewAdminController = require('../controllers/overview.admin.controller');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/', authMiddleware.signed, overviewAdminController.pageAdminOverView);
module.exports = router;