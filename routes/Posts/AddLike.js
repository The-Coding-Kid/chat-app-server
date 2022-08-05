const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");

router.post("/", async (req, res) => {
  const { email, post_id } = req.body;
  const post = await Post.findOne({ _id: post_id });
  if (post) {
    post.liked_by.push(email);
    post.likes = post.liked_by.length;
    await post.save();
    res.json("Post liked");
  } else {
    res.json("Post not found");
  }
});

module.exports = router;
