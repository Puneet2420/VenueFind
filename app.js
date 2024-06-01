const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./modules/listing.js");
const path = require("path");
const methodOveride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

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

app.use("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found !"));
});

// middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.render("error.ejs",{message});
});





