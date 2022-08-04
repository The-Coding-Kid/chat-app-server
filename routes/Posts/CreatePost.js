const express = require("express");
const router = express.Router();
const Post = require("../../models/Post.model");
const Group = require("../../models/Group.model");
const fs = require("fs");
const multer = require("multer");
const url = require("url");
const uploadImage = require("../../uploadImage");
const tinify = require("tinify");
const tinify_key = process.env.TINIFY_KEY;
tinify.key = tinify_key;

const multerMid = multer({
  storage: multer.memoryStorage(),
});

router.route("/").post(multerMid.single("file"), async (req, res) => {
  console.log(req.body);
  const content = req.body.content;
  const createdByEmail = req.body.createdByEmail;
  const createdByName = req.body.createdByName;
  const group_posted_in = req.body.group_posted_in;
  // const profile_photo = req.body.profile_photo;
  const file = req.file;
  const imageUrl = await uploadImage(file);

  // console.log(req.body);

  const post = new Post({
    content: content,
    createdByEmail: createdByEmail,
    createdByName: createdByName,
    image: imageUrl,
    group_posted_in: group_posted_in,
    // profile_photo: profile_photo,
  });

  Group.findOne({ name: group_posted_in }).then((group) => {
    if (group) {
      group.posts.push(post._id);
      group.save();
      console.log("Post added to group");
    }
  });

  post
    .save()
    .then((post) => {
      res.json("Post added");
      console.log(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
