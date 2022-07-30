const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");
const fs = require("fs");

router.get("/", (req, res) => {
  console.log("getting all posts");
  const posts = Post.find({})
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
