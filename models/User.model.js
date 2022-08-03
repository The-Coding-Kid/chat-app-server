const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture: {
    type: String,
  },
  groups_joined: {
    type: [String],
    default: ["Public"],
  },
});

module.exports = mongoose.model("User", UserSchema);
