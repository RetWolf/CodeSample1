const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates User model with required fields
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  registerDate: Date
});

var User = mongoose.model("User", userSchema);

module.exports = User;
