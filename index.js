const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://user:abcd1234@cluster0.guvbf.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Connection to DB failed");
    } else {
      console.log("Connection to DB successful");
    }
  }
);

const User = require("./routes/User");
const Movie = require("./routes/Movies");
const Ticket = require("./routes/Ticket");

app.use(cors());
app.use(express.json());

app.use("/user", User);
app.use("/movie", Movie);
app.use("/ticket", Ticket);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
