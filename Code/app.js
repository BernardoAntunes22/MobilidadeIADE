var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connection = require("./models/connection");
var indexRouter = require("./routes/index");
var usersRouter = require('./routes/users');
var clienteRouter = require("./routes/clienteRoute");
var rideRouter = require("./routes/rideRoute");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/API/clientes", clienteRouter);
app.use("/api/rides", rideRouter);
app.use('/users', usersRouter);
module.exports = app;