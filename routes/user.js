const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");

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
        console.log(userRegistered);
        req.flash("success", "Welcome to Wanderlust!")
        res.redirect("/listings");
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
    "/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    }),
    (req, res) => {
        res.send("logined successfully");
});

module.exports = router;
