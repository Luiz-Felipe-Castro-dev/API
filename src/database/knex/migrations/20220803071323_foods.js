
exports.up =  knex => knex.schema.createTable("foods", table => {
  table.increments("id");
  table.text("food_name");
  table.text("ingredients");
  table.integer("price");
  table.integer("author_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("foods");
