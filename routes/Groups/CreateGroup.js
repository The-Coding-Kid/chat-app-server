const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");
const User = require("../../models/User.model");
const multer = require("multer");
const uploadImage = require("../../uploadImage");

const multerMid = multer({
  storage: multer.memoryStorage(),
});

router.post("/", multerMid.single("file"), (req, res) => {
  const name = req.body.name;
  const createdByEmail = req.body.createdByEmail;
  const file = req.file;
  const imageUrl = uploadImage(file);

  const group = new Group({
    name: name,
    createdByEmail: createdByEmail,
    members: [createdByEmail],
    posts: [],
    background: imageUrl,
  });

  User.findOne({ email: createdByEmail }).then((user) => {
    user.groups_joined.push(name);
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
