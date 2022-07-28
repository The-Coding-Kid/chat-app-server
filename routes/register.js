// Register route
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
  });
  user.save().then((user) => {
    res.json("User added");
  });
});

module.exports = router;
