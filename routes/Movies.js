const app = require("express")();
const Movie = require("../models/MovieModel");
const Timing = require("../models/ShowTimeModel");

//Search Movie
app.get("/search", async (req, res) => {
  if (!req.query.q) {
    res.send({ success: false, data: [] });
    return;
  }

  //have to do regex here
  let movie = await Movie.find({ name: req.query.q });

  res.send({ success: true, data: movie });
});

//Get all movies
app.get("/", async (req, res) => {
  let movies = await Movie.find({});
  res.send({ success: true, data: movies });
});

//Post a new movie
app.post("/", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.duration ||
    !req.body.director
  ) {
    res.send({ success: false, message: "Invalid Request" });
    return;
  }

  let movie = await Movie.find({ name: req.body.name });

  if (movie[0]) {
    res.send({ success: false, message: "Movie Already Exits" });
    return;
  }

  let newMovie = new Movie({
    name: req.body.name,
    description: req.body.description,
    director: req.body.director,
    duration: req.body.duration,
  });

  let response = await newMovie.save();

  console.log(response);

  res.send({ success: true, message: "Movie created" });
});

//Get timing of a movie
app.get("/timing", async (req, res) => {
  if (!req.query.movieID) {
    res.send({ success: false, message: "Invalid Request" });
    return;
  }

  let movies = await Timing.find({ movieID: req.query.movieID });

  res.send({ succes: true, data: movies });
});

//Post timing of a movie
app.post("/timing", async (req, res) => {
  if (
    !req.body.timing ||
    !req.body.price ||
    !req.body.total_tickets ||
    !req.body.movieID
  ) {
    res.send({ success: false, message: "Invalid Body" });
    return;
  }

  let movieExists = await Movie.findOne({ _id: req.body.movieID });

  if (!movieExists) {
    res.send({ success: false, message: "Movie Doesn't Exits" });
    return;
  }

  let checkTiming = await Timing.findOne({
    movieID: req.body.movieID,
    timing: req.body.timing,
  });

  if (checkTiming) {
    res.send({ success: false, message: "Same time entry Error" });
    return;
  }

  let newTiming = new Timing({
    timing: req.body.timing,
    price: req.body.price,
    occupied: 0,
    total_tickets: req.body.total_tickets,
    movieID: req.body.movieID,
  });

  let response = await newTiming.save();

  console.log(response);

  res.send({ success: true, message: "Movie timings added" });
});

module.exports = app;
