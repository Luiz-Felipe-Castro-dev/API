
exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.text("foods");
  table.integer("total_price");
  table.integer("client_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("orders")
