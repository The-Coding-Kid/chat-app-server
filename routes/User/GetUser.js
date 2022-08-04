const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");

router.post("/", async (req, res) => {
  const { email } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ email: email });
  res.json(user);
});
module.exports = router;
