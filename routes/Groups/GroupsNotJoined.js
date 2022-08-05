const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");
const User = require("../../models/User.model");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const allGroups = await Group.find({});
  const groupsNotJoinedByUser = allGroups.filter((group) => {
    return !group.members.includes(email);
  });
  res.json(groupsNotJoinedByUser);
});

module.exports = router;
