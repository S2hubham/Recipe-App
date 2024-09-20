const User = require("../models/user")

module.exports.renderSignupForm = (req, res) => {
    res.render("signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        const regUser = await User.register(newUser, password);
        // after signup directly gets loggedin
        req.login(regUser, (err) => {
            if(err){
                req.flash("error", `Error in login`);
                res.redirect("/listings");
            }
            req.flash("success", `${username} <-_-> Welcome to Wanderlust`);
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out successfully");
        res.redirect("/listings");
    });
}