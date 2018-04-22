const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates Item model with a name, price, and array of keywords
const itemSchema = new Schema({
  name: String,
  price: Number,
  keywords: Array
});

var Item = mongoose.model("Item", itemSchema);

module.exports = Item;
