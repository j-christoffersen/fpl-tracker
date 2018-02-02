const knex = require('../database');

class Player {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.team = data.team;
    this.position = data.position;
    this.photo = data.photo;
  }

  static async get(_, args) {
    const data = await knex('players').where({
      id: args.id,
    });

    return new Player(data[0]);
  }
}

module.exports = Player;
