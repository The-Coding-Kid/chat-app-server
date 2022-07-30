// Register route
const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const fs = require("fs");
const multer = require("multer");
const storage = require("../../storage");
const uploadImage = require("../../uploadImage");

const multerMid = multer({
  storage: multer.memoryStorage(),
});

router.route("/").post(multerMid.single("file"), async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const file = req.file;
  const imageUrl = await uploadImage(file);

  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    profile_picture: imageUrl,
  });
  user
    .save()
    .then((user) => {
      res.json("User added");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
