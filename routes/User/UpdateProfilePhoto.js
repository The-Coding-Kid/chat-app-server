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
  const email = req.body.email;
  const new_profile_picture = {
    data: fs.readFileSync(req.file.path),
    contentType: "image/jpeg",
  };
  const find_user = async () => {
    const user = await User.findOne({ email: email });
    if (user) {
      user.profile_picture = new_profile_picture;
      await user.save();
      res.json("Profile picture updated");
    } else {
      res.json("User not found");
    }
  };
  find_user();
});

module.exports = router;
