const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");
const User = require("../../models/User.model");

router.post("/", (req, res) => {
  const email = req.body.email;
  const group_name = req.body.group_name;
  Group.findOne({ name: group_name }).then((group) => {
    if (group) {
      group.members.push(email);
      group.save();
    } else {
      res.json("Group not found");
    }
  });
  User.findOne({ email: email }).then((user) => {
    if (user) {
      user.groups_joined.push(group_name);
      user.save();
    }
  });
  res.json("Member successfully added to group!");
});

module.exports = router;
