const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Not in use yet
const menuSchema = new Schema({
  name: String,
  menu: Array
});

var Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
