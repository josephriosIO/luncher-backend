const router = require("express").Router();
const db = require("../../database/helpers/profileModels");
const { authenticate } = require("../../auth/authenticate");
// post endpoint
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, address } = req.body;
    // if post doesn't include title or contents send error
    if (!name || !address) {
      res.status(400).json("Please provide missing fields for post");
    }
    const profile = await db.add(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get certain profile by id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await db.findById(id);

    //if id doesn't exist send error
    if (profile.length === 0) {
      res.status(404).json("The post with the specified ID does not exist.");
    } else {
      res.status(200).json(profile);
    }
  } catch (err) {
    res.status(500).json("The proflie information could not be retrieved.");
  }
});

// delete endpoint
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProfile = await db.remove(id);

    //if it doesnt contain the right id send error
    if (deleteProfile <= 0) {
      res
        .status(404)
        .json({ message: "The profile with the specified ID does not exist." });
    } else {
      res.status(200).json(deleteProfile);
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message
    });
  }
});

//update endpoint
router.put("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, address } = req.body;

    const updateProfile = await db.update(id, req.body);
    if (updateProfile <= 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    if (!name || !address) {
      res.status(400).json("Please provide missing fields.");
    } else {
      res.status(200).json(updateProfile);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
