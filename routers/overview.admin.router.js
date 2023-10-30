const router = require('express').Router();
const overviewAdminController = require('../controllers/overview.admin.controller');

router.get('/', overviewAdminController.pageAdminOverView);
module.exports = router;