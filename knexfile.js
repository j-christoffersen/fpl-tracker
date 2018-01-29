require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    database: 'fpl_tracker',
    user: 'jackson',
    password: process.env.PG_PASSWORD,
  },
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};
