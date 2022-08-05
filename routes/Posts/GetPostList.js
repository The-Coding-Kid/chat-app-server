const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");

router.post("/", async (req, res) => {
  const { id } = req.body;
  const response = [];
  for (let i = 0; i < id.length; i++) {
    const post = await Post.findById(id[i]);
    response.push(post);
  }
  res.json(response.reverse());
});

module.exports = router;
