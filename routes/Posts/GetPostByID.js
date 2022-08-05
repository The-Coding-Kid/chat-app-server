const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");

router.post("/", async (req, res) => {
  const { id } = req.body;
  const post = await Post.findById(id);
  res.json(post);
});

module.exports = router;
