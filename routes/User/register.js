// Register route
const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "profile_pictures/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").post(upload.single("file"), (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;

  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    profile_picture: {
      data: fs.readFileSync(req.file.path),
      contentType: "image/jpeg",
    },
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
