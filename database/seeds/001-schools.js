exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("schools")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("schools").insert([
        {
          name: "Lambda School",
          username: "lambdastaff1",
          password: "password"
        },
        {
          name: "Diablo Valley College",
          username: "diablostaff1",
          password: "password"
        }
      ]);
    });
};
