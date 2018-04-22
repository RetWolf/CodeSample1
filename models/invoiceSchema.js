const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Still setting this up
const invoiceSchema = new Schema({
  u_id: ObjectId, //User
  p_id: ObjectId, //Place
  total: Number,
  method: String
});

var Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
