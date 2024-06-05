const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { SavedRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email, username
        });
        const userRegistered = await User.register(newUser, password);
        req.login(userRegistered,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!")
            res.redirect("/listings");
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post(
        "/login",
        SavedRedirectUrl,
        passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async(req, res) => {
        req.flash("success","Login successfully!");
        let requiredUrl=res.locals.redirectUrl || "/listings";
        res.redirect(requiredUrl);
});

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listings");
    });
});

module.exports = router;
