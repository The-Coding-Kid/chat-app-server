const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const router = require("express").Router();
const uploadImage = require("./uploadImage.js");
const multer = require("multer");
var compression = require("compression");

app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use(helmet());
app.use(compression());

const register = require("./routes/User/register");
const posts = require("./routes/Posts/posts");
const createPosts = require("./routes/Posts/CreatePost");
const updateProfilePhoto = require("./routes/User/UpdateProfilePhoto");
const createGroup = require("./routes/Groups/CreateGroup");
const joinGroup = require("./routes/Groups/JoinGroup");
const getAllGroups = require("./routes/Groups/GetAllGroups");
const createComment = require("./routes/Posts/CreateComment");
const GetUser = require("./routes/User/GetUser");
const AddFriend = require("./routes/User/AddFriend");
const RemoveFriend = require("./routes/User/RemoveFriend");
const GetFriends = require("./routes/User/GetFriends");
const GetPosts = require("./routes/Posts/GetPostByID");
const GetPostList = require("./routes/Posts/GetPostList");
const AddLike = require("./routes/Posts/AddLike");
const HasUserLikedPost = require("./routes/Posts/HasUserLikedPost");
const GroupsNotJoined = require("./routes/Groups/GroupsNotJoined");
const LeaveGroup = require("./routes/Groups/LeaveGroup");
// import { promisify } from "util";
// const GET_ASYNC = promisify(client.get).bind(client);
// const SET_ASYNC = promisify(client.set).bind(client);
// const DEL_ASYNC = promisify(client.del).bind(client);

// const client = redis.createClient(process.env.REDIS_URL);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server started on port ${port} and pushing to Heroku`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/register", register);
app.use("/api/posts", posts);
app.use("/api/posts/create", createPosts);
app.use("/api/profile/updatephoto", updateProfilePhoto);
app.use("/api/groups/create", createGroup);
app.use("/api/groups/join", joinGroup);
app.use("/api/groups", getAllGroups);
app.use("/api/comments/create", createComment);
app.use("/api/user", GetUser);
app.use("/api/users/friends/add", AddFriend);
app.use("/api/users/friends/remove", RemoveFriend);
app.use("/api/users/friends", GetFriends);
app.use("/api/posts/get", GetPosts);
app.use("/api/posts/getlist", GetPostList);
app.use("/api/posts/like", AddLike);
app.use("/api/posts/liked", HasUserLikedPost);
app.use("/api/groups/notjoined", GroupsNotJoined);
app.use("/api/groups/leave", LeaveGroup);
