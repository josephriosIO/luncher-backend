const db = require("../dbConfig");

module.exports = {
  add,
  findById,
  findBy
};

async function add(user) {
  const [id] = await db("schools").insert(user);

  return findById(id);
}

function findById(id) {
  return db("schools")
    .where({ id })
    .first();
}

function findBy(loginUser) {
  return db("schools").where(loginUser);
}
