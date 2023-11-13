const arrayHelpers = require('../helpers/array-helpers.js');
const reviewAdminModel = require("../models/reviews.admin.model.js");

const renderPageReview = async (req, res) => {
    try {
        const reviews = await reviewAdminModel.getReviews();
        const reviewReversed = arrayHelpers.reverseArray(reviews);

        res.status(200).render("reviews", { reviews: reviewReversed });
    } catch (error) {
        console.log('Render page review error: ' + error.message);
    }
};

const removeReview = async (req, res) => {
    try {
        const { reviewID } = req.body;
        await reviewAdminModel.removeReviews(reviewID);
        req.flash("success", "Xoá đánh giá thành công.");
        res.redirect("/admin/reviews");
    } catch (error) {
        console.log('Remove review error: ' + error.message);
    }
};

module.exports = {
    renderPageReview,
    removeReview,
};
