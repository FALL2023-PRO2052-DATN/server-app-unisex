const router = require('express').Router();
const categoryAdminController = require('../controllers/category.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/category', authMiddleware.signed, categoryAdminController.pageAdminCategory);
router.post('/category/create', authMiddleware.signed, categoryAdminController.insertCategory);
router.post('/category/update', authMiddleware.signed, categoryAdminController.updateCategory);
router.post('/category/delele', authMiddleware.signed, categoryAdminController.removeCategory);

module.exports = router;