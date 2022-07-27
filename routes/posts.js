const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");

router.get("/", (req, res) => {
  const posts = Post.find({})
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
