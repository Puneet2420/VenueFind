const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");


//route for reviews/feedback
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(createReview));

// delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isAuthor, wrapAsync(destroyReview));

module.exports = router;