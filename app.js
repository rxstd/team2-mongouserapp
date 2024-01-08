var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const layout = require("express-ejs-layouts");

var sequelize = require("./models/index").sequelize;

// DB연결
sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

var indexRouter = require("./routes/index");
var channelRouter = require("./routes/channel");
var memberAPIRouter = require("./routes/memberAPI");
var channelAPIRouter = require("./routes/channelAPI");

const session = require("express-session");

var app = express();

app.use(
  session({
    secret: "ormcamp",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note: In production, set this to true and use HTTPS
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(layout);
app.set("layout", "layout");
app.set("layout extractScripts", true);

app.use("/", indexRouter);
app.use("/chat/", channelRouter);
app.use("/api/member/", memberAPIRouter);
app.use("/api/channel/", channelAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
