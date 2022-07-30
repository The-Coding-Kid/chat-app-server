const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const router = require("express").Router();
const uploadImage = require("./uploadImage.js");
const multer = require("multer");
const bodyParser = require("body-parser");

const multerMid = multer({
  storage: multer.memoryStorage(),
});

app.use(cors());
// app.use(helmet());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const register = require("./routes/User/register");
const posts = require("./routes/Posts/posts");
const createPosts = require("./routes/Posts/CreatePost");
const updateProfilePhoto = require("./routes/User/UpdateProfilePhoto");
const createGroup = require("./routes/Groups/CreateGroup");
const joinGroup = require("./routes/Groups/JoinGroup");
const getAllGroups = require("./routes/Groups/GetAllGroups");
const createComment = require("./routes/Posts/CreateComment");

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

app.post(
  "/testgoogleroute",
  multerMid.single("file"),
  async (req, res, next) => {
    try {
      const myFile = req.file;
      const imageUrl = await uploadImage(myFile);
      res.status(200).json({
        message: "Upload was successful",
        data: imageUrl,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.use("/api/register", register);
app.use("/api/posts", posts);
app.use("/api/posts/create", createPosts);
app.use("/api/profile/updatephoto", updateProfilePhoto);
app.use("/api/groups/create", createGroup);
app.use("/api/groups/join", joinGroup);
app.use("/api/groups", getAllGroups);
app.use("/api/comments/create", createComment);
