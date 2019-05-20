const router = require("express").Router();
const db = require("../../database/helpers/registerModels");

router.get("/:id", async (req, res) => {
  try {
    const profile = await db.getProfile(req.params.id);
    if (!profile) {
      res.status(400).json({ msg: "id does not exist" });
    } else {
      res.json(profile);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
