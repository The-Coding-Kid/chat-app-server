const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdByEmail: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  group_posted_in: {
    type: String,
    // required: true,
  },
  comments: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
  },
  liked_by: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
