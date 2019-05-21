const router = require("express").Router();
const db = require("../../database/helpers/profileModels");
const { authenticate } = require("../../auth/authenticate");
const {
  prepNewProfile,
  prepUpdateProfile,
  verifyProfileOwner
} = require("./middleware/");
// post endpoint
router.post("/", authenticate, prepNewProfile, async ({ newProfile }, res) => {
  try {
    // const { name, address } = req.body;
    // // if post doesn't include title or contents send error
    // if (!name || !address) {
    //   res.status(400).json("Please provide missing fields for post");
    // }
    const profile = await db.add(newProfile);
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get certain profile by id
router.get("/:id", authenticate, async ({ params: { id } }, res) => {
  try {
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
router.delete(
  "/:pid",
  authenticate,
  verifyProfileOwner,
  async ({ params: { pid } }, res) => {
    try {
      const deleteProfile = await db.remove(pid);

      //if it doesnt contain the right id send error
      if (deleteProfile <= 0) {
        res.status(404).json({
          message: "The profile with the specified ID does not exist."
        });
      } else {
        res.status(200).json(deleteProfile);
      }
    } catch (err) {
      res.status(500).json({
        errorMessage: err.message
      });
    }
  }
);

//update endpoint
router.put(
  "/:id",
  authenticate,
  verifyProfileOwner,
  prepUpdateProfile,
  async ({ updated, pid }, res) => {
    try {
      const updateProfile = await db.update(pid, updated);
      if (updateProfile <= 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(updateProfile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
