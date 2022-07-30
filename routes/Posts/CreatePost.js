const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");
const Group = require("../../models/Group.model");
const fs = require("fs");
const multer = require("multer");
const url = require("url");
const uploadImage = require("../../uploadImage");

const multerMid = multer({
  storage: multer.memoryStorage(),
});

router.route("/").post(multerMid.single("file"), async (req, res) => {
  const content = req.body.content;
  const createdByEmail = req.body.createdByEmail;
  const createdByName = req.body.createdByName;
  // const group_posted_in = req.body.group_posted_in;
  const file = req.file;
  const imageUrl = await uploadImage(file);

  // console.log(req.body);

  const post = new Post({
    content: content,
    createdByEmail: createdByEmail,
    createdByName: createdByName,
    image: imageUrl,
    // group_posted_in: group_posted_in,rs
  });

  // Group.findOne({ name: group_posted_in }).then((group) => {
  //   if (group) {
  //     group.posts.push(post._id);
  //     group.save();
  //     console.log("Post added to group");
  //   }
  // });

  post
    .save()
    .then((post) => {
      res.json("Post added");
    })
    .catch((err) => {
      res.json(err);
    });
  res.json("test");
});

module.exports = router;
