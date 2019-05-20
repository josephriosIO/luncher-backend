const router = require("express").Router();
const db = require("../../database/helpers/profileModels");

router.get("/", async (req, res) => {
  try {
    const allSchools = await db.get();
    res.status(200).json(allSchools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
