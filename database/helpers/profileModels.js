const db = require("../dbConfig");

module.exports = {
  add,
  findById,
  findBy,
  update,
  remove,
  get,
  getPostsUserID,
  getBy
};

async function add(user) {
  const [id] = await db("school_profile").insert(user);

  return getBy({ id }).first();
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

async function update(id, profile) {
  await db("school_profile")
    .where({ id })
    .update({ ...profile });

  return getBy({ id }).first();
}

function remove(id) {
  return db("school_profile")
    .where("id", Number(id))
    .del();
}

function getBy(filter) {
  const postFilter = {};
  for (let key in filter) {
    postFilter[`p.${key}`] = filter[key];
  }
  return db
    .select(
      "u.username",
      "p.id",
      "p.address",
      "p.name",
      "p.school_id",
      "p.balance"
    )
    .from("school_profile as p")
    .where(postFilter)
    .join("schools as u", { "u.id": "p.school_id" });
}

function getPostsUserID(pid) {
  console.log(pid);
  return db
    .select("school_id as ownerID")
    .from("school_profile")
    .where({ id: pid })
    .first();
}
