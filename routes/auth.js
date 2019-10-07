const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("invalid email ");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("invalid password");

  //XXXXXXXXXXXXXXXXXXX SECRET PRIVET KEY MUST BE REMOVED FROM THE IMPLEMENTAION CODE AND PUT AS ENV VAT XXXXXXXXXXXXXXXXXXX
  //this token is like an id and will be saved at localstorage to make server recognize the client browser without repeating this reqest every time the client wants to do any thig realted to backend
  const token = User.generataAuthToken();
  //   res.send(`welcome aboard : ${user.name}`);
  res.send(`welcome aboard : ${token}`);
});

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

module.exports = router;
