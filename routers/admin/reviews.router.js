const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const reviewsController = require("../../controllers/admin/reviews.controller.js");

router.get("/reviews", authMiddleware.signed, reviewsController.renderPageReview);
router.put("/reviews/:reviewID", authMiddleware.signed, reviewsController.removeReview);

module.exports = router;
