const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Sets up Place model with required fields
const placeSchema = new Schema({
  name: String,
  title: String,
  addr: String,
  town: String,
  state: String,
  zip: String
});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;
