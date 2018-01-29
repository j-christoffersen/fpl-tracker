
exports.seed = async (knex) => {
  await knex('statlines').del();
  await knex('games').del();
  await knex('players').del();
};
