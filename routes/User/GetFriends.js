const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");

router.post("/", async (req, res) => {
  const user = req.body.user;
  const user_friends = await User.findOne({ email: user })
    .then((user) => {
      res.json(user.friends);
    })
    .catch((err) => {
      res.json;
    });
});

module.exports = router;
