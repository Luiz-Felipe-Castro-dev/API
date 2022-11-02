
exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.text("ingredient");
  table.integer("author_id").references("id").inTable("users");
  table.text("ingredient_img").default(null);

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})
exports.down = knex => knex.schema.dropTable("ingredients")
