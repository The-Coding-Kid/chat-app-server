const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");

router.get("/", (req, res) => {
  console.log("getting all posts");
  const posts = Post.find({}, null, { limit: 10 })
    .then((posts) => {
      res.json(posts.reverse());
      console.log(posts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
