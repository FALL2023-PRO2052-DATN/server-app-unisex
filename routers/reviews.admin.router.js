const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviews.admin.controller.js");
const authMiddleware = require('../middleware/auth-middleware.js');

router.get("/reviews", authMiddleware.signed, reviewController.pageAdminReview);
router.post("/reviews/delete", authMiddleware.signed, reviewController.removeReview);

module.exports = router;
