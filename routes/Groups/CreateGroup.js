const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");
const User = require("../../models/User.model");

router.post("/", (req, res) => {
  const name = req.body.name;
  const createdByEmail = req.body.createdByEmail;

  const group = new Group({
    name: name,
    createdByEmail: createdByEmail,
    members: [createdByEmail],
    posts: [],
  });

  User.findOne({ email: createdByEmail }).then((user) => {
    user.groups.push(group.name);
    user.save();
  });

  group
    .save()
    .then((group) => {
      console.log(group);
      res.json("Group added");
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

module.exports = router;
