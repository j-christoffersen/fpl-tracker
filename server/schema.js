// const {
//   // graphql,
//   // GraphQLSchema,
//   // GraphQLObjectType,
//   // GraphQLString,
// } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { Player } = require('../database');

const typeDefs = `
  type Player {
    id: Int!
    name: String
    team: String
    position: String
    photo: String
    statlines: [Statline]
    minutes: [Int]
    goalsScored: [Int]
    assists: [Int]
    cleanSheets: [Int]
    goalsConceded: [Int]
    ownGoals: [Int]
    penaltiesSaved: [Int]
    penaltiesMissed: [Int]
    yellowCards: [Int]
    redCards: [Int]
    saves: [Int]
    bonus: [Int]
    value: [Int]
  }

  type Statline {
    id: Int!
    minutes: Int
    goalsScored: Int
    assists: Int
    cleanSheets: Int
    goalsConceded: Int
    ownGoals: Int
    penaltiesSaved: Int
    penaltiesMissed: Int
    yellowCards: Int
    redCards: Int
    saves: Int
    bonus: Int
    value: Int
  }

  type Query {
    player(id: Int!): Player
    players: [Player]
  }
`;

const resolvers = {
  Query: {
    player: (_, args) => Player.get(args),
    players: (_, args) => Player.getAll(args),
  },
  Player: {
    statlines: player => player.getStatlines(),
    minutes: player => player.minutes(),
    goalsScored: player => player.goalsScored(),
    assists: player => player.assists(),
    cleanSheets: player => player.cleanSheets(),
    goalsConceded: player => player.goalsConceded(),
    ownGoals: player => player.ownGoals(),
    penaltiesSaved: player => player.penaltiesSaved(),
    penaltiesMissed: player => player.penaltiesMissed(),
    yellowCards: player => player.yellowCards(),
    redCards: player => player.redCards(),
    saves: player => player.saves(),
    bonus: player => player.bonus(),
    value: player => player.value(),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
