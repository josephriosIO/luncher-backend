exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("school_profile")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("school_profile").insert([
        {
          name: "Lambda School",
          address: "505 makebelieve Dr San Jose, CA 94345",
          uid: "f467StrA0ZZ8MAPoe2zcDQk53hO1",
          funding: true,
          balance: 0,
          school_id: 1
        },
        {
          name: "Diablo Valley College",
          address: "505 somewhere St San Pablo, CA 66863",
          uid: "f467StrA0ZZ8MAPoe2zcDQk53hO2",
          funding: false,
          balance: 4000,
          school_id: 2
        }
      ]);
    });
};
