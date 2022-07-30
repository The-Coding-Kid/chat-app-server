const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  createdByEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postRepliedTo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", Comment);
