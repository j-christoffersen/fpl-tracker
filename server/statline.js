const knex = require('../database');

class Statline {
  constructor(data) {
    Object.assign(this, data);
  }

  static async getAll(args) {
    const data = await knex('statlines').where(args);
    console.log(data);

    return data.map(datum => new Statline(datum));
  }
}

module.exports = Statline;
