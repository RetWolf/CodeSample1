var express = require("express");
var router = express.Router();

const mongo = require("mongodb");
const mongoose = require("mongoose");

//Connects to back-end server I set up
mongoose.connect("IPHERE");

//Brings in models
const Place = require("../models/placeSchema");
const Item = require("../models/itemSchema");

//This is a section for users only. All pages will test to see if the user is logged in or not
//Gets dashboard and passes the users name
router.get("/", (req, res, next) => {
  if (req.session.user) {
    res.render("dashboard", { title: "Dashboard", user: req.session.user });
  } else {
    res.redirect("/users/login");
  }
});

//Gets order page with users preferences - Changing this in next version
router.get("/order", (req, res, next) => {
  if (req.session.user) {
    res.render("order", { title: "New Order", user: req.session.user });
  } else {
    res.redirect("/users/login");
  }
});

//Gets recent orders and has options to view details or re-order - Changing this in next version
router.get("/reorder", (req, res, next) => {
  if (req.session.user) {
    res.render("reorder", { title: "Reorder", user: req.session.user });
  } else {
    res.redirect("/users/login");
  }
});

//Opens up users setting regarding preferred payment options and delivery addresses - Work in progress
router.get("/settings", (req, res, next) => {
  if (req.session.user) {
    res.render("settings", { title: "Settings", user: req.session.user });
  } else {
    res.redirect("/users/login");
  }
});

//Explore page to help customers find new food near them - Work in progress
router.get("/explore", (req, res, next) => {
  if (req.session.user) {
    Place.find({}, "name title town zip", (err, p) => {
      res.render("explore", {
        title: "Explore",
        user: req.session.user,
        places: p
      });
    });
  } else {
    res.redirect("/users/login");
  }
});

//Searches the database for nearby places based on user input
router.post("/search/places", (req, res, next) => {
  Place.find(
    { name: eval(`/${req.body.searchPlace.toLowerCase()}/ig`) },
    "title addr town zip",
    (err, places) => {
      let results = {
        type: "place",
        data: places
      };
      console.log(`/${req.body.searchPlace.toLowerCase()}/ig`);
      console.log(results);
      res.render("results", { title: "Search Results", results: results });
    }
  );
});

//Searches the database for nearby food based on user input
router.post("/search/items", (req, res, next) => {
  Item.find(
    {
      $or: [
        {
          keywords: {
            $all: [eval(`/${req.body.searchItem.toLowerCase()}/ig`)]
          }
        },
        { name: eval(`/${req.body.searchItem.toLowerCase()}/ig`) }
      ]
    },
    "name keywords price place",
    (err, items) => {
      let results = {
        type: "item",
        data: items
      };
      console.log(results);
      res.render("results", { title: "Search Results", results: results });
    }
  );
});

module.exports = router;
