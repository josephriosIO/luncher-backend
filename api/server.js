const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const registerRoute = require("../routes/auth/Register");
const profileRoute = require("../route/profiles/Profile");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/schools", registerRoute);
server.use("/api/schools/profile", profileRoute);

server.get("/", (req, res) => {
  res.json({ server: "UP" });
});

module.exports = server;
