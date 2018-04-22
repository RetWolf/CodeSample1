var express = require("express");
var router = express.Router();

const mongo = require("mongodb");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");
const { sanitize } = require("express-validator/filter");
const bcrypt = require("bcryptjs");

//Connects to back-end server I set up
mongoose.connect("IPHERE");

//Bring in required models
const User = require("../models/userSchema");

//All pages here are for users who haven't logged in
//Default is login page
router.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.render("login", { title: "Login" });
  } else {
    res.redirect("/dashboard");
  }
});

//Renders login page
router.get("/login", (req, res, next) => {
  if (!req.session.user) {
    res.render("login", { title: "Login" });
  } else {
    res.redirect("/dashboard");
  }
});

//Logs user out and sends them back to login
router.get("/logout", (req, res, next) => {
  req.session.user = null;
  res.redirect("/");
});

//Renders registration page
router.get("/register", (req, res, next) => {
  if (req.session.user != null) {
    res.redirect("/dashboard");
  } else {
    res.render("register", { title: "Register" });
  }
});

//Login Post Request
router.post(
  "/login",
  //Validation on inputs
  [
    check("email", "Invalid Email")
      .isEmail()
      .normalizeEmail(),
    check("password", "Invalid Password")
      .isLength({ min: 5 })
      .trim()
  ],
  (req, res, next) => {
    //Checks for errors on validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    } else {
      //Finds user in database
      User.findOne({ email: req.body.email })
        .select("name password")
        .exec((err, user) => {
          if (user != null) {
            //Compares password against the stored hash
            bcrypt.compare(req.body.password, user.password).then(r => {
              //Redirects based on result
              if (r === true) {
                req.session.user = user;
                res.redirect("/dashboard");
              } else {
                res.redirect("/users/login");
              }
            });
          } else {
            res.redirect("/users/login");
          }
        });
    }
  }
);

//Register Post Request
router.post(
  "/register",
  //Validation on inputs
  [
    check("name", "Name Required")
      .isLength({ min: 1 })
      .trim(),
    check("email", "Email Not Valid")
      .isEmail()
      .normalizeEmail(),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password minimum 5 characters")
      .custom((value, { req }) => {
        return value === req.body.passwordCheck;
      })
      .withMessage("Passwords need to match")
      .trim()
  ],
  (req, res, next) => {
    //Catches validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    //Hashes passwords
    bcrypt.hash(req.body.password, 8, (err, hash) => {
      if (err) {
        //Catches hashing errors
        return res.status(422).json({ err: err.mapped() });
      } else {
        //Creates newUser with body data
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          registerDate: Date()
        });
        //Saves the new user to the database
        newUser.save((err, user) => {
          if (err) {
            //Catches any errors when saving the user
            return res.status(422).json({ err: err.mapped() });
          }
          //Redirects to the user dashboard
          req.session.user = user;
          res.redirect("/dashboard");
        });
      }
    });
  }
);

module.exports = router;
