// const {
//   // graphql,
//   // GraphQLSchema,
//   // GraphQLObjectType,
//   // GraphQLString,
// } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const Player = require('./player.js');

const typeDefs = `
  type Player {
    id: Int!
    name: String
    team: String
    position: String
    photo: String
  }

  type Query {
    player(id: Int!): Player
  }
`;

const resolvers = {
  Query: {
    player: Player.get,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
