const express = require("express");
const router = express.Router();
const Comment = require("../../models/Comment.model");
const Post = require("../../models/Post.model");

router.post("/", (req, res) => {
  const content = req.body.content;
  const createdByEmail = req.body.createdByEmail;
  const createdByName = req.body.createdByName;
  //PostRepliedTo is the ID of the post that is replied to
  const postRepliedTo = req.body.postRepliedTo;

  const comment = new Comment({
    content: content,
    createdByEmail: createdByEmail,
    createdByName: createdByName,
    postRepliedTo: postRepliedTo,
  });
  comment
    .save()
    .then(console.log(comment))
    .catch((err) => {
      console.error(err);
    });

  const updatePostComment = async () => {
    const post = await Post.findById(postRepliedTo);
    post.comments.push(comment._id);
    post.save();
  };
  updatePostComment();
  res.json("Comment added");
});

module.exports = router;
