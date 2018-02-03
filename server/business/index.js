const knex = require('../../database');

class Model {
  constructor(data) {
    Object.assign(this, data);
  }
}

class DbModel extends Model {
  static async get(args) {
    const data = await knex(this.tableName).where(args);

    return new this(data[0]);
  }

  static async getAll(args) {
    const data = await knex(this.tableName).where(args);

    return data.map(datum => new this(datum));
  }
}


class Player extends DbModel {
  async statlines() {
    if (!this._statlines) {
      this._statlines = await Statline.getAll({ playerId: this.id });
    }

    return this._statlines;
  }

  async goalsScored() {
    return (await this.statlines()).map(statline => statline.goalsScored);
  }

  async assists() {
    return (await this.statlines()).map(statline => statline.assists);
  }
}

Player.tableName = 'players';


class Statline extends DbModel {

}

Statline.tableName = 'statlines';


module.exports.Player = Player;
module.exports.Statline = Statline;

