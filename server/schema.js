// const {
//   // graphql,
//   // GraphQLSchema,
//   // GraphQLObjectType,
//   // GraphQLString,
// } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { Player } = require('./business');

const typeDefs = `
  type Player {
    id: Int!
    name: String
    team: String
    position: String
    photo: String
    statlines: [Statline]
    goalsScored: [Int]
    assists: [Int]
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
    statlines: (player, args) => player.statlines(),
    goalsScored: (player, args) => player.goalsScored(),
    assists: (player, args) => player.assists(),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
