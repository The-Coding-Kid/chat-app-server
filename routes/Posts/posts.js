const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");
const fs = require("fs");

router.get("/", (req, res) => {
  console.log("getting all posts");
  const posts = Post.find({})
    .then((posts) => {
      console.log(posts);
      res.sendFile(posts[0].image.path);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
