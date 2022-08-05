const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");

router.post("/", async (req, res) => {
  const { email, post_id } = req.body;
  const post = await Post.findById(post_id);
  console.log(post);
  let hasLiked = false;
  if (post) {
    for (let i = 0; i < post.liked_by.length; i++) {
      if (post.liked_by[i] === email) {
        hasLiked = true;
        break;
      }
    }
  }
  if (hasLiked) {
    res.json("true");
  } else {
    res.json("false");
  }
});

module.exports = router;
