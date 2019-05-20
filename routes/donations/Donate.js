const router = require("express").Router();
const db = require("../../database/helpers/registerModels");
const transactionsDb = require("../../database/dbConfig");

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

router.get("/transaction/:id", (req, res) => {
  console.log(req.params.id);
  if (req.params.id) {
    transactionsDb("transactions")
      .where("uid", "=", req.params.id)
      .then(transactions => {
        res.status(200).send(transactions);
        transactionsDb("school_profile")
          .where("uid", "=", req.params.id)
          .select("balance", "name")
          .then(ress => {
            res.status(201).json(ress);
          });
      })
      .catch(err => console.log(err.message));
  }
});

router.post("/donation/:id", (req, res) => {
  const pay = req.body;
  console.log(req.body);
  console.log(req.params.id);
  transactionsDb("transactions")
    .insert(pay)
    .then(res1 => {
      transactionsDb("school_profile")
        .where("id", "=", req.params.id)
        .select("balance")
        .increment("balance", pay.donation)
        .then(res2 => {
          res.status(201).json({
            message: `Donated $${pay.donation}.`
          });
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
