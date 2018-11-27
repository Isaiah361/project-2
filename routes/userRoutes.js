const express = require("express");
const userRoutes = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const passport = require("passport");


userRoutes.get("/signup", (req, res, next) => {
  res.render("User/signup");
});

userRoutes.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
        res.render("User/signup", { message: " Username and Password" });
        return;
    }
    User.findOne({ username }) 
    .then(user => {
        if (user !== null) {
        res.render("User/signup", { message: "The username already exists" });
        return;
        }
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        User.create({
            username: username,
            password: hashPass,
            email: req.body.email,
            avatar: req.body.avatar,
            bio: req.body.bio,

        })
        .then((user)=>{
            req.login(user, (err) => {
                if (err) {
                    req.flash('error', 'something went wrong with auto login, please log in manually')
                    res.redirect('/login')
                  return;
                }
        
                res.redirect('/profile');
              });

        })
        .catch((err)=>{
            next(err)
        });

    })
    .catch((err)=>{
        next(err)
    })
    
});

userRoutes.get('/login', (req, res, next)=>{  
    res.render('User/login', { "message": req.flash("error") })
})

userRoutes.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));

userRoutes.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/");
})

userRoutes.get('/profile', (req, res, next)=>{
  res.render("User/profile");
    if(!req.user){
        req.flash('error', 'page not available');
        res.redirect('/login')
        return;
    } 

})


module.exports = userRoutes;