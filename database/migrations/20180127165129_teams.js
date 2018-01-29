
exports.up = knex => (
  knex.schema
    .createTable('teams', (table) => {
      table.integer('id').primary();
      table.string('name');
      table.string('abreviation');
      table.integer('rank');
      table.integer('goalsFor');
      table.integer('goalsAgainst');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('teams')
);
