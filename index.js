const express = require("express");
const app = express();
const path = require("path");
const { connect } = require("./server/helper/db_connect");
app.use(express.json());

const multer = require("multer");

const bodyParser = require("body-parser");
const upload = multer();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public", "index.html"))
);
app.use("/api", require("./server/routes/index"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
  connect();
});
