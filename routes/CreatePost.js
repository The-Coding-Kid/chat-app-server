const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const fs = require("fs");
const multer = require("multer");

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
  const content = req.body.content;
  const createdBy = req.body.createdBy;

  const post = new Post({
    content: content,
    createdBy: createdBy,
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: "image/jpeg",
    },
  });

  post.save().then((post) => {
    res.json("Post added");
  });
});

module.exports = router;
