const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const fs = require("fs");
const multer = require("multer");
const uploadImage = require("../../uploadImage");

const multerMid = multer({
  storage: multer.memoryStorage(),
});

router.route("/").post(multerMid.single("file"), async (req, res) => {
  const email = req.body.email;
  const file = req.file;
  const imageUrl = await uploadImage(file);
  const find_user = async () => {
    const user = await User.findOne({ email: email });
    if (user) {
      user.profile_picture = imageUrl;
      await user.save();
      res.json("Profile picture updated");
    } else {
      res.json("User not found");
    }
  };
  find_user();
});

module.exports = router;
