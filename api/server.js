const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const registerRoute = require("../routes/auth/Register");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/schools", registerRoute);

server.get("/", (req, res) => {
  res.json({ server: "UP" });
});

module.exports = server;
