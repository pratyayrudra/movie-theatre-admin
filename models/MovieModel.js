const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: String,
  description: String,
  director: String,
  duration: Number,
  timing: Date,
  price: Number,
  total_tickets: Number,
});

module.exports = mongoose.model("Movie", MovieSchema);
