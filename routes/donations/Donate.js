const router = require("express").Router();
const db = require("../../database/helpers/registerModels");
const transactionsDb = require("../../database/dbConfig");
const { authenticate } = require("../../auth/authenticate");

router.get("/:id", authenticate, async (req, res) => {
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

router.get("/transaction/:id", authenticate, (req, res) => {
  transactionsDb("transactions")
    .where("uid", "=", req.params.id)
    .then(transactions => {
      res.status(200).send(transactions);
    })
    .catch(err => console.log(err.message));
});

router.post("/donation/:id", async (req, res) => {
  try {
    const pay = req.body;
    console.log(req.body);
    console.log(req.params.id);
    await transactionsDb("transactions").insert(pay);

    await transactionsDb("school_profile")
      .where("id", "=", req.params.id)
      .select("balance")
      .increment("balance", pay.donation);

    const profile = await db.getProfile(req.params.id);

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
