exports.up = function(knex, Promise) {
  // the tables most be created in the right order,
  // tables with FK are created after the referenced table is created
  return knex.schema
    .createTable("schools", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();
    })

    .createTable("school_profile", tbl => {
      // the tracks table must be created before this table is created
      tbl.increments();

      tbl.string("name", 128).notNullable();

      tbl.string("address", 256).notNullable();

      tbl.boolean("funding").notNullable();

      tbl
        .integer("school_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("schools")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("donors", tbl => {
      // the tracks table must be created before this table is created
      tbl.increments();

      tbl.string("name", 128);
    });
};

exports.down = function(knex, Promise) {
  // tables with FK must be removed before the referenced table is removed
  return knex.schema
    .dropTableIfExists("school_profile")
    .dropTableIfExists("schools")
    .dropTableIfExists("donors");
};
