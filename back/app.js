var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const uploader = require("./src/core/multer");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dialogsRouter = require("./routes/dialogs");
var messagesRouter = require("./routes/messages");
var filesRouter = require("./routes/upload");

var socketApi = require("./src/socketApi/socketApi");
const { updateLastSeen } = require("./src/middleware/updateLastSeen");
const { checkAuth } = require("./src/middleware/checkAuth");

var app = express();

app.io = require("socket.io")({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
socketApi(app.io);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS, PUT, PATCH, POST, DELETE",
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept, Authorization, token",
    );
    next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(checkAuth);
app.use(updateLastSeen);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/dialogs", dialogsRouter);
app.use("/messages", messagesRouter);
app.use("/files", uploader.single("file"), filesRouter);

app.locals.io = app.io;

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
