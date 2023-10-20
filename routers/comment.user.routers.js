const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.user.controllers');

router.post('/read-byId-product-comment', commentController.readCommentByIdProduct);

module.exports = router;  