const express = require("express");
const bcrypt = require("bcrypt");

const user = require("../models/user");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  let auser = await user.findOne({ email: req.body.email });
  if (auser) return res.send("user already registered");

  const salt = await bcrypt.genSalt(10);

  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  // >>>I WANT USER TO BE LOGEN IN DIRECTLY AFTER SIGNING IN<<<
  const token = user.generataAuthToken();
  res.header("x-authUser", token).send(`welcome aboard : ${token}`);
});

router.get("/", async (req, res) => {
  const users = await user.find({});
  res.send(users);
});

module.exports = router;
