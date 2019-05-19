const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = router;
