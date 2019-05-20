const db = require("../dbConfig");
const proflieDb = require("./profileModels");

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

const getProfile = async id => {
  const school = await db("school_profile")
    .join("schools", "schools.id", "school_profile.school_id")
    .select("*")
    .where("schools.id", id)
    .first();

  return {
    ...school
  };
};

module.exports = {
  add,
  findById,
  findBy,
  getProfile
};
