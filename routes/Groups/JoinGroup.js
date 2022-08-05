const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");
const User = require("../../models/User.model");

router.post("/", (req, res) => {
  const email = req.body.email;
  const group_id = req.body.group_id;
  const group_name = req.body.group_name;
  Group.findOne({ _id: group_id }).then((group) => {
    if (group) {
      for (let i = 0; i < group.members.length; i++) {
        if (group.members[i] === email) {
          res.json("Already a member");
          return;
        }
      }
      group.members.push(email);
      group.save();
    } else {
      res.json("Group not found");
      return;
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
