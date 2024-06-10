const User = require("../models/user.js");

//signup form
module.exports.signupForm=(req, res) => {
    res.render("users/signup.ejs");
};

//signup callback
module.exports.signup=async (req, res) => {
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
            req.flash("success", "Welcome to Home Page!")
            res.redirect("/listings");
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
};

//render login form
module.exports.renderloginForm=(req, res) => {
    res.render("users/login.ejs");
};

//log--in
module.exports.login=async(req, res) => {
    req.flash("success","Login successfully!");
    let requiredUrl=res.locals.redirectUrl || "/listings";
    res.redirect(requiredUrl);
};

//logout
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listings");
    });
};
