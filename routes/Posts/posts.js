const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");
const fs = require("fs");
const redis = require("redis");

router.post("/", (req, res) => {
  console.log("getting all posts");
  const posts = Post.find({})
    .then((posts) => {
      const last_ten_posts = posts.slice(-10);
      res.json(last_ten_posts.reverse());
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
