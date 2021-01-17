const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  user_type: String,
});

module.exports = mongoose.model("User", UserSchema);
