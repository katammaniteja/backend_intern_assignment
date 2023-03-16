const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

require("./db/conn");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(express.json());
app.use(require("./routers/auth"));
app.use(require("./routers/slots"));

const server = http.createServer(app);

server.listen(5000);
