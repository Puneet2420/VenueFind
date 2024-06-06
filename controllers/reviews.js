const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//create review
module.exports.createReview=async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = await new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success", "review done successfully!");
    res.redirect(`/listings/${listing._id}`);
};

//delete review
module.exports.destroyReview=async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};