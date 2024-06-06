const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const { SavedRedirectUrl } = require("../middleware.js");
const { signupForm, signup, renderloginForm, login, logout } = require("../controllers/user.js");

router.get("/signup", signupForm);

router.post("/signup", wrapAsync(signup));

router.get("/login", renderloginForm);

router.post(
        "/login",
        SavedRedirectUrl,
        passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    login);

router.get("/logout",logout);

module.exports = router;
