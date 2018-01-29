
exports.up = knex => (
  knex.schema
    .createTable('gameweeks', (table) => {
      table.integer('id').primary();
      table.boolean('isComplete');
    })
    .createTable('players', (table) => {
      table.integer('id').primary();
      table.string('name');
      table.integer('teamId').references('teams.id');
      table.string('position');
    })
    .createTable('games', (table) => {
      table.integer('id').primary();
      table.integer('gameId').references('games.id');
      table.integer('homeTeamId').references('teams.id');
      table.integer('awayTeamId').references('teams.id');
    })
    .createTable('statlines', (table) => {
      table.integer('id').primary();
      table.integer('playerId').references('players.id');
      table.integer('gameId').references('games.id');
      table.integer('minutes');
      table.integer('goalsScored');
      table.integer('assists');
      table.integer('cleanSheets');
      table.integer('goalsConceded');
      table.integer('ownGoals');
      table.integer('penaltiesSaved');
      table.integer('penaltiesMissed');
      table.integer('yellowCards');
      table.integer('redCards');
      table.integer('saves');
      table.integer('bonus');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('statlines')
    .dropTable('games')
    .dropTable('players')
    .dropTable('gameweeks')
);
