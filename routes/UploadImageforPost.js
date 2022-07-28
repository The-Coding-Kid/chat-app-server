const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require("../models/Post.model");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/").post(upload.single("file"), (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  //   var new_img = new Post({
  //     title: "",
  //     content: "",
  //     image: {
  //       data: fs.readFileSync(req.file.path),
  //     },
  //     createdBy: "",
  //   });
  //   new_img.image.contentType = "image/jpeg";
  //   const to_update = new_img.image;
  //   const postToUpdate = Post.findOneAndUpdate(
  //     { _id: req.body.id },
  //     { to_update },
  //     {
  //       new: true,
  //     }
  //   );
});

module.exports = router;
