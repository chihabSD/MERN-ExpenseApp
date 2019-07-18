const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");

//use api v1
const v1 = require("./routes/v1");

const app = express();

// -------- DB Config ------//

// go to process.env and get the mongo url
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// when connection occurs execute the function and
mongoose.connection.on("connected", () => {
  console.log("Connected to database"); //display a message
});

//on error
mongoose.connection.on("error", err => {
  // if there is an error
  console.error(`Failed to connect to database: ${err}`); //display a message
});

// -------- Middlewares------//
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// -------- Routes ------//
app.use("/api/v1", v1); // any request fall under the prefix /ai/v2 go to v1 and deal with it

module.exports = app;
