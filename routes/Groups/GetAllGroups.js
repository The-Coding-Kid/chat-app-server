const express = require("express");
const router = express.Router();
const Group = require("../../models/Group.model");

router.get("/", (req, res) => {
  Group.find({}).then((groups) => {
    res.json(groups);
  });
});

module.exports = router;
