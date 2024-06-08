const { query } = require("express");
const Listing = require("../models/listing.js");
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken=process.env.MAP_TOKEN;
const geoCodingClient=mbxGeocoding({accessToken:mapToken});

// listing all the listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// rendering the form to create a new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// showing a specific listing by its ID
module.exports.showListings = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// creating a new listing
module.exports.createNewListing = async (req, res, next) => {
    let response=await geoCodingClient
        .forwardGeocode({
            query:req.body.listing.location,
            limit:1,
        })
        .send();
        // console.log(response.body.features);

    let url=req.file.path;
    let filename=req.file.filename;
    const data = new Listing(req.body.listing);
    data.owner = req.user._id;
    data.image={url,filename};

    data.geometry=response.body.features[0].geometry;
    let x=await data.save();
    console.log(x);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// rendering the form to edit a listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    let orginalImageUrl=listing.image.url;
    orginalImageUrl=orginalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing ,orginalImageUrl});
};

// updating an existing listing
module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;
    const data = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        data.image={url,filename};
        await data.save();
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect("/listings");
};

// deleting a listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
