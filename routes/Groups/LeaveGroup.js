const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");
const User = require("../../models/User.model");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const group_name = req.body.group_name;
  const group = await Group.findOne({ name: group_name });
  if (group) {
    group.members = group.members.filter((member) => member !== email);
  }
  User.findOne({ email: email }).then((user) => {
    user.groups_joined = user.groups_joined.filter(
      (group) => group !== group_name
    );
    user.save();
  });
  res.json("User removed from group");
});

module.exports = router;
