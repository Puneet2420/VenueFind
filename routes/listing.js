const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showListings, createNewListing, renderEditForm, updateListing, destroyListing } = require("../controllers/listings.js");


// Index route
router.get("/", wrapAsync(index));

// Create new route
router.get("/new", isLoggedIn, renderNewForm);

// Show route
router.get("/:id", wrapAsync(showListings));

//create listing 
router.post("/", isLoggedIn,
    validateListing,
    wrapAsync(createNewListing));


//edit route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(renderEditForm));

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(updateListing));


//delete route
router.delete(
    "/:id", isLoggedIn,
    isOwner,
    wrapAsync(destroyListing));

module.exports = router;