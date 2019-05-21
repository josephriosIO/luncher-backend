const db = require("../../../database/helpers/profileModels");
module.exports = {
  prepNewProfile,
  prepUpdateProfile,
  verifyProfileOwner
};

function prepNewProfile(req, res, next) {
  const {
    decoded: { subject },
    body: { name, address, funding, uid }
  } = req;
  if (address) {
    const newPost = { funding, uid, name };
    newPost.address = address ? address : "";
    newPost.school_id = subject;
    req.newProfile = { ...newPost };
    next();
  } else {
    res.status(400).json({ message: "Profile must contain a address" });
  }
}

function prepUpdateProfile(req, res, next) {
  const {
    params: { id },

    body: { address, name }
  } = req;

  if (name || address) {
    const updated = {};
    if (name) updated.name = name;
    if (address) updated.address = address;
    req.updated = { ...updated };
    req.pid = id;
    next();
  } else {
    res.status(400).json({
      message: "Updating a profile requires a name and address"
    });
  }
}

async function verifyProfileOwner(
  { params: { id }, decoded: { subject } },
  res,
  next
) {
  try {
    console.log(id);
    const { ownerID } = await db.getPostsUserID(id);
    console.log(ownerID);
    ownerID === subject
      ? next()
      : res.status(400).json({ message: "User does not own that profile" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
