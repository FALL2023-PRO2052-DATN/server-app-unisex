const reviewAdminModel = require("../models/reviews.admin.model.js");

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send("Server error: " + error.message);
};

const pageAdminReview = async (req, res) => {
    try {
        const reviews = await reviewAdminModel.getAll();
        res.status(200).render("reviews", { reviews });
    } catch (error) {
        handleError(res, error);
    }
};

const removeReview = async (req, res) => {
    try {
        const { id } = req.body;
        await reviewAdminModel.remove(id);
        req.flash("success", "Xoá đánh giá thành công.");
        res.redirect("/admin/reviews");
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    pageAdminReview,
    removeReview,
};
