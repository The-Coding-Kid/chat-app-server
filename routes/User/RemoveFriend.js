const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");

router.post("/", (req, res) => {
  const remover = req.body.remover;
  const removed = req.body.removed;
  const remover_user = User.findOne({ email: remover });
  const removed_user = User.findOne({ email: removed });
  remover_user
    .then((user) => {
      user.friends.splice(user.friends.indexOf(removed), 1);
      user.save();
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
  removed_user.then((user) => {
    user.friends.splice(user.friends.indexOf(remover), 1);
    user.save();
  });
  res.json("Friend removed");
});

module.exports = router;
