const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  movieID: String,
  timingID: String,
  qty: Number,
  success: Boolean,
});

module.exports = mongoose.model("Ticket", TicketSchema);
