const db = require("../dbConfig");

module.exports = {
  add,
  findById,
  findBy,
  update,
  remove,
  get
};

async function add(user) {
  const [id] = await db("school_profile").insert(user);

  return findById(id);
}

function get(id) {
  return db("school_profile");
}

function findById(id) {
  return db("school_profile")
    .where({ id })
    .first();
}

function findBy(loginUser) {
  return db("school_profile").where(loginUser);
}

function update(id, profile) {
  return db("school_profile")
    .where("id", Number(id))
    .update(profile);
}

function remove(id) {
  return db("school_profile")
    .where("id", Number(id))
    .del();
}
