const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const registerRoute = require("../routes/auth/Register");
const profileRoute = require("../routes/profiles/Profile");
const donationRoute = require("../routes/donations/Donate");
const pageRoute = require("../routes/homepage/ListOfSchools");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", registerRoute);
server.use("/api/schools/profile", profileRoute);
server.use("/api/donate", donationRoute);
server.use("/api/home", pageRoute);

server.get("/", (req, res) => {
  res.json({ server: "UP" });
});

module.exports = server;
