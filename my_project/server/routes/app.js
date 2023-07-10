var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("In the server file.");
  res.sendFile(path.join(__dirname, "dist/my_project/index.html"));
});

module.exports = router;
