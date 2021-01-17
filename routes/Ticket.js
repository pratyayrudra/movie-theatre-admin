const app = require("express")();

const Timing = require("../models/ShowTimeModel");
const Ticket = require("../models/TicketModel");

app.post("/", async (req, res) => {
  if (!req.body.movieID || !req.body.timingID || !req.body.qty) {
    res.send({ success: false, message: "Invalid Body" });
    return;
  }

  let time = await Timing.findOne({ _id: req.body.timingID });

  if (time["occupied"] + req.body.qty > time["total_tickets"]) {
    res.send({ success: false, message: "Not Enough Tickets Left" });
    return;
  }

  let newTicket = new Ticket({
    movieID: req.body.movieID,
    timingID: req.body.timingID,
    qty: req.body.qty,
  });

  let ticketResponse = await newTicket.save();

  console.log(ticketResponse);

  let occupiedReponse = await Timing.updateOne(
    { _id: req.body.timingID },
    { $inc: { occupied: req.body.qty } }
  );

  console.log("Updated ticket count");

  res.send({ success: true });
});

module.exports = app;
