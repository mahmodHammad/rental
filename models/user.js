const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, min: 4, required: true }
});

userschema.statics.generataAuthToken = function() {
  //this referes to model
  //the token is a encrepted message that hide some data inside it for ex : a json that holds some private data about user.
  const token = jwt.sign({ _id: this._id }, "will e changed later");
  return token;
};
const userModel = mongoose.model("user", userschema);

module.exports = userModel;
