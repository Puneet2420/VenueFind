const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./modules/listing.js");
const path = require("path");
const methodOveride=require("method-override");
const { runInNewContext } = require("vm");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapasync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review = require("./modules/review.js");
const review = require("./modules/review.js");
const { log } = require("console");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

// Database connection
const DBurl = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(DBurl);
}
main().then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log(err);
});

app.listen(8080, () => {
    console.log("Server is running at port 8080");
});

// Routes
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// Index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// Create new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

// --------------------------------Create route 
// handling try and catch 
// app.post("/listings", async (req, res,next) => {
//     try{
//         const data = new Listing(req.body.listing);
//         await data.save();
//         res.redirect("/listings");
//     }
//     catch(err){
//         next(err);
//     }
// });
//create route 
// anotherway of handling error using wrapasync instead try
app.post("/listings",wrapAsync(async (req,res,next)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for Listing");
    // }
    validateListing(req,res,next);
    const data = new Listing(req.body.listing);
        await data.save();
        res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

app.put("/listings/:id",wrapAsync(async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for Listing");
    // }
    validateListing(req,res,next);
    let {id}=req.params;
    const data=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
}));

//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

//route for reviews/feedback
app.post("/listings/:id/reviews",wrapAsync(async(req,res,next)=>{
    validateReview(req,res,next);
    let listing=await Listing.findById(req.params.id);

    let newReview=await new Review(req.body.review);
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    res.redirect(`/listings/${listing._id}`); 
}));

// delete review route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));


app.use("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found !"));
});

// middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.render("error.ejs",{message});
});

// validate listing 
const validateListing=(req,res,next)=>{
    let result=listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    };
};

const validateReview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    };
};
