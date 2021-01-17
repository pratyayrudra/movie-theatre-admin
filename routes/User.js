const app = require("express")();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

app.get("/", async (req, res) => {
  let admin = await User.find({});
  if (admin[0]) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send("Invalid body");
    return;
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.send({ success: false, message: "Email id doesnt exists" });
    return;
  }

  if (bcrypt.compareSync(req.body.password, user["password"])) {
    res.send({ success: true });
  } else {
    res.send({ success: false, message: "Wrong password" });
  }
});

app.post("/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send("Invalid body");
    return;
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  let admin = await User.find({ email: req.body.email });
  if (admin[0]) {
    res.send({ success: false, message: "Email Id exists" });
    return;
  }

  let NewUser = new User({
    email: req.body.email,
    password: hash,
    user_type: "admin",
  });

  let response = await NewUser.save();

  console.log(response);

  res.send({ success: true, message: "User created" });
});

module.exports = app;
