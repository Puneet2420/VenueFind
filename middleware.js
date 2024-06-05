const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Saving reqUrl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must login first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.SavedRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!res.locals.currUser) {
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "Only the owner can make changes!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!res.locals.currUser) {
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Validate listing 
module.exports.validateListing = (req, res, next) => {
    let result = listingSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(400, result.error);
    }
    next();
};

// Validate review
module.exports.validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(400, result.error);
    }
    next();
};
