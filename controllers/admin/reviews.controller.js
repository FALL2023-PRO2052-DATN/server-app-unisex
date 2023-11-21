const arrayHelpers = require('../../helpers/array-helpers.js');
const reviewsModel = require("../../models/admin/reviews.model.js");

const renderPageReview = async (req, res) => {
  try {
    const reviews = await reviewsModel.getReviews();
    const reviewsReversed = arrayHelpers.reverseArray(reviews);
    res.status(200).render("reviews", { reviews: reviewsReversed });
  } catch (error) {
    console.error('Render page review failed', error);
  }
}

const removeReview = async (req, res) => {
  try {
    const { reviewID } = req.params.reviewID;
    await reviewsModel.removeReviews(reviewID);
    req.flash("success", "Xoá đánh giá thành công.");
    res.redirect("/admin/reviews");
  } catch (error) {
    console.error('Removing review failed', error);
  }
}

module.exports = {
  renderPageReview,
  removeReview
}
