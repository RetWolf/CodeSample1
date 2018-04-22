var express = require("express");
var router = express.Router();

//Basic menu for login or register
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
