const express = require("express");
const router = express.Router();

const mongo = require("mongodb");
const mongoose = require("mongoose");

//Connects to back-end server I set up
mongoose.connect("IPHERE");

//Bring in required models
const Place = require("../models/placeSchema");
const Menu = require("../models/menusSchema");

//Sends the search results - Changing in next version
router.get("/", (req, res, next) => {
  res.send("places page");
});

router.get("/:place", (req, res, next) => {
  //Find place, If place exists, yield place page with menu
  Place.find({ name: `${req.params.place}` }, "title", (err, place) => {
    place = place[0];
    //Find menu and display
    Menu.find({ name: req.params.place }, "menu", (err, menu) => {
      menu = menu[0].menu;

      res.render("places", {
        place: place,
        menu: menu,
        user: req.session.user
      });
    });
  });
});

module.exports = router;
