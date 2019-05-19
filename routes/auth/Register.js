const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { authenticate, generateToken } = require("../../auth/authenticate");
const db = require("../../database/helpers/registerModels");

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    if (!user.username || !user.password) {
      return res
        .status(400)
        .json({ message: "please fill in all required fields." });
    }

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    const registerSchool = await db.add(user);
    res.status(201).json(registerSchool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  // implement user login
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "please enter missing fields" });
    }
    const loginUser = await db.findBy({ username }).first();
    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) {
      return res.status(404).json({ message: "invalid credentials" });
    }

    const token = generateToken(loginUser);
    res.status(200).json({ message: `Welcome ${loginUser.username}!`, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
