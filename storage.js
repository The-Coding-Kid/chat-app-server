const Cloud = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "./key.json");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "practical-brace-357917",
});

module.exports = storage;
