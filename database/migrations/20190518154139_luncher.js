exports.up = function(knex, Promise) {
  // the tables most be created in the right order,
  // tables with FK are created after the referenced table is created
  return knex.schema
    .createTable("schools", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable();

      tbl
        .string("username", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
    })

    .createTable("school_profile", tbl => {
      // the tracks table must be created before this table is created
      tbl.increments();

      tbl.string("name", 128).notNullable();

      tbl.string("address", 256).notNullable();

      tbl.boolean("funding").notNullable();

      tbl.integer("balance");

      tbl
        .string("uid", 35)
        .unique()
        .notNullable();

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
    })

    .createTable("transactions", table => {
      table.increments();

      table
        .string("uid")
        .unsigned()
        .notNullable()
        .references("uid")
        .inTable("school_profile")
        .onDelete("CASCADE");

      table.integer("donation").defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  // tables with FK must be removed before the referenced table is removed
  return knex.schema
    .dropTableIfExists("school_profile")
    .dropTableIfExists("schools")
    .dropTableIfExists("donors")
    .dropTableIfExists("transactions");
};
