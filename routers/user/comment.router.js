const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/user/comment.controller');

router.post('/read-byId-product-comment', commentController.readCommentByIdProduct);
router.post('/insert-comment', commentController.insertComment);

module.exports = router;  