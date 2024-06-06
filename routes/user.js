const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const { SavedRedirectUrl } = require("../middleware.js");
const { signupForm, signup, renderloginForm, login, logout } = require("../controllers/user.js");

router
    .route("/signup")
    .get(signupForm)
    .post(wrapAsync(signup));

router
    .route("/login")
    .get(renderloginForm)
    .post(
        SavedRedirectUrl,
        passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    login);

router.get("/logout",logout);

module.exports = router;

/*
//another compact way is given above

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

*/
