const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");

router.post("/", (req, res) => {
  const requester = req.body.requester;
  const requested = req.body.requested;
  const requester_user = User.findOne({ email: requester });
  const requested_user = User.findOne({ email: requested });
  requester_user
    .then((user) => {
      user.friends.push(requested);
      user.save();
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
  requested_user
    .then((user) => {
      user.friends.push(requester);
      user.save();
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
  res.json("Friend request sent");
});

module.exports = router;
