var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");

var userMiddleware = require("../middleware/user.middleware");

dotenv.config();

const webTitle = process.env.PROJECT_TITLE;

router.get("/", userMiddleware, function (req, res, next) {
  res.render("chat/index", { title: webTitle, recentChats: [], chats: [] });
});

module.exports = router;
