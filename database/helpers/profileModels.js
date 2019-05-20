const db = require("../dbConfig");

module.exports = {
  add,
  findById,
  findBy
};

async function add(user) {
  const [id] = await db("school_profile").insert(user);

  return findById(id);
}

function findById(id) {
  return db("school_profile")
    .where({ id })
    .first();
}

function findBy(loginUser) {
  return db("school_profile").where(loginUser);
}
