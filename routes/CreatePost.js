const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const createdBy = req.body.createdBy;

  const post = new Post({
    title: title,
    content: content,
    createdBy: createdBy,
  });
  post
    .save()
    .then((post) => {
      res.json(post);
      console.log("Post added");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
