const Posts = require("../../../database/helpers/profileModels");
module.exports = {
  prepNewPost,
  prepUpdatePost,
  verifyPostOwner
};

function prepNewPost(req, res, next) {
  const {
    decoded: { subject },
    body: { name, address, funding, uid }
  } = req;
  console.log(subject);
  if (address) {
    const newPost = { funding, uid, name };
    newPost.address = address ? address : "";
    newPost.school_id = subject;
    req.newProfile = { ...newPost };
    next();
  } else {
    console.log("Post without a picture");
    res.status(400).json({ message: "Posts must contain a picture" });
  }
}

function prepUpdatePost(req, res, next) {
  const {
    params: { id },

    body: { address, name }
  } = req;
  console.log(id);
  if (name || address) {
    const updated = {};
    if (name) updated.name = name;
    if (address) updated.address = address;
    req.updated = { ...updated };
    req.pid = id;
    next();
  } else {
    console.log("Updating post w/o info");
    res.status(400).json({
      message: "Updating a profile requires a name and address"
    });
  }
}

async function verifyPostOwner(
  { params: { id }, decoded: { subject } },
  res,
  next
) {
  try {
    console.log(id);
    const { ownerID } = await Posts.getPostsUserID(id);
    console.log(ownerID);
    ownerID === subject
      ? next()
      : res.status(400).json({ message: "User does not own that profile" });
  } catch (err) {
    console.log("No post at ID: delete");
    res.status(400).json({ message: err.message });
  }
}
