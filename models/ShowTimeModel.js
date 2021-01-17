const mongoose = require("mongoose");

//movie name, description, director, duration).

const TimingSchema = new mongoose.Schema({
  timing: Date,
  price: Number,
  occupied: Number,
  total_tickets: Number,
  movieID: String,
});

module.exports = mongoose.model("Timing", TimingSchema);
