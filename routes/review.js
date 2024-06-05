const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");


//route for reviews/feedback
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(async (req, res, next) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = await new Review(req.body.review);
        newReview.author = req.user._id;
        await newReview.save();
        listing.reviews.push(newReview);
        await listing.save();
        req.flash("success", "review done successfully!");
        res.redirect(`/listings/${listing._id}`);
    }));

// delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isAuthor, wrapAsync(async (req, res, next) => {
        let { id, reviewId } = req.params;
        let review = await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review deleted successfully!");
        res.redirect(`/listings/${id}`);
    }));

module.exports = router;