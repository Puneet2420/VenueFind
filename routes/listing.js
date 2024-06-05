const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");


// Index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// Create new route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// Show route
router.get("/:id",wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

// --------------------------------Create route 
// handling try and catch 
// router.post("/listings", async (req, res,next) => {
//     try{
//         const data = new Listing(req.body.listing);
//         await data.save();
//         res.redirect("/listings");
//     }
//     catch(err){
//         next(err);
//     }
// });
// anotherway of handling error using wrapasync instead try

//create route 
router.post("/", isLoggedIn,
    validateListing,
    wrapAsync(async (req, res, next) => {
        const data = new Listing(req.body.listing);
        data.owner = req.user._id;
        await data.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    }));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing does not exist!");
            res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
    }));

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async (req, res, next) => {
        let { id } = req.params;
        const data = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success", "Listing updated successfully!");
        res.redirect("/listings");
    }));

//delete route
router.delete(
    "/:id", isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing deleted successfully!");
        res.redirect("/listings");
    }));

module.exports = router;