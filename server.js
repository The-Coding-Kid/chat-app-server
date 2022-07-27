const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const router = require("express").Router();

app.use(cors());
app.use(helmet());
app.use(express.json());

const register = require("./routes/register");
const posts = require("./routes/posts");

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
  console.log(`Server started on port ${port}`);
});

app.use("/api/register", register);
app.use("api/posts", posts);
