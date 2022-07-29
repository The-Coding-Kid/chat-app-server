const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: {
    type: [String],
    default: [],
  },
  posts: {
    type: [String],
    default: [],
  },
  createdByEmail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Group", GroupSchema);
