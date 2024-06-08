const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showListings, createNewListing, renderEditForm, updateListing, destroyListing } = require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
// const upload=multer({dest:"upload/"});   //this is saving image to upload floder
const upload=multer({storage});   //this is saving to cloud storage

router
    .route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(createNewListing));


// Create new route
router.get("/new", isLoggedIn, renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(showListings))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(destroyListing));

//edit route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner,
    wrapAsync(renderEditForm));
//export
module.exports = router;






/* //Another way for this to make compact code is given above 

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
    
    */