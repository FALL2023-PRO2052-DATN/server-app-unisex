const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviews.admin.controller.js");

router.get("/reviews", reviewController.pageAdminReview);
router.post("/reviews/delete", reviewController.removeReview);

module.exports = router;
