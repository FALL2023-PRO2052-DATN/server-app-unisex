const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const categoryController = require('../../controllers/admin/category.controller.js');

router.get('/category', authMiddleware.signed, categoryController.renderPageCategory);
router.post('/category', authMiddleware.signed, categoryController.insertCategory);
router.put('/category/:categoryID/update', authMiddleware.signed, categoryController.updateCategory);
router.put('/category/:categoryID/delete', authMiddleware.signed, categoryController.removeCategory);

module.exports = router;