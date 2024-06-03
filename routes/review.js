const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Listing = require("../modules/listing.js");
const Review = require("../modules/review.js");


const validateReview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    };
};

//route for reviews/feedback
router.post("/",wrapAsync(async(req,res,next)=>{
    validateReview(req,res,next);
    let listing=await Listing.findById(req.params.id);

    let newReview=await new Review(req.body.review);
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success","review done successfully!");
    res.redirect(`/listings/${listing._id}`); 
}));

// delete review route
router.delete("/:reviewId", wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}));

module.exports=router;