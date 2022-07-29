const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdByEmail: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
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
    required: true,
  },
  comments: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
