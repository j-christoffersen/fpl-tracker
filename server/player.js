const knex = require('../database');

class Player {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.team = data.team;
    this.position = data.position;
    this.photo = data.photo;
  }

  static async get(args) {
    const data = await knex('players').where(args);

    return new Player(data[0]);
  }

  static async getAll(args) {
    const data = await knex('players').where(args);

    return data.map(datum => new Player(datum));
  }
}

module.exports = Player;
