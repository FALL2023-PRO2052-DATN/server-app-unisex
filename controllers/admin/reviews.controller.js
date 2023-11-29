const arrayHelpers = require('../../helpers/array-helpers.js');
const reviewsModel = require("../../models/admin/reviews.model.js");

const renderPageReview = async (req, res) => {
  try {
    const reviews = await reviewsModel.getReviews();
    const reviewsReversed = arrayHelpers.reverseArray(reviews);
    res.render('reviews', { reviews: reviewsReversed });
  } catch (error) {
    console.error('Render page review failed', error);
  }
}

const removeReview = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    const results = await reviewsModel.removeReview(reviewID);
    console.log("🚀 ~ file: reviews.controller.js:18 ~ removeReview ~ results:", results)

    if (results.changedRows > 0) {
      req.flash("success", "Xoá đánh giá thành công.");
    } else {
      req.flash("error", "Xoá đánh giá không thành công.");
    }

    res.redirect('back');
  } catch (error) {
    console.error('Removing review failed', error);
  }
}

module.exports = {
  renderPageReview,
  removeReview
}
