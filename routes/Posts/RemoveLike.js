const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");

router.post("/", async (req, res) => {
  const { email, post_id } = req.body;
  const post = await Post.findOne({ _id: post_id });
  if (post) {
  }
});

module.exports = router;
