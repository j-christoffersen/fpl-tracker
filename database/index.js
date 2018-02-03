const knex = require('./knex.js');

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
  async getStatlines() {
    if (!this.statlines) {
      this.statlines = await Statline.getAll({ playerId: this.id });
    }

    return this.statlines;
  }

  async goalsScored() {
    return (await this.getStatlines()).map(statline => statline.goalsScored);
  }

  async assists() {
    return (await this.getStatlines()).map(statline => statline.assists);
  }

  async goalsConceded() {
    return (await this.getStatlines()).map(statline => statline.goalsConceded);
  }

  async penaltiesSaved() {
    return (await this.getStatlines()).map(statline => statline.penaltiesSaved);
  }

  async penaltiesMissed() {
    return (await this.getStatlines()).map(statline => statline.penaltiesMissed);
  }

  async yellowCards() {
    return (await this.getStatlines()).map(statline => statline.yellowCards);
  }

  async redCards() {
    return (await this.getStatlines()).map(statline => statline.redCards);
  }

  async saves() {
    return (await this.getStatlines()).map(statline => statline.saves);
  }

  async bonus() {
    return (await this.getStatlines()).map(statline => statline.bonus);
  }

  async value() {
    return (await this.getStatlines()).map(statline => statline.value);
  }

  async x() {
    return (await this.getStatlines()).map(statline => statline.x);
  }
}

Player.tableName = 'players';


class Statline extends DbModel {

}

Statline.tableName = 'statlines';


module.exports.Player = Player;
module.exports.Statline = Statline;

