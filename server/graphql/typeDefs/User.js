const { gql } = require('apollo-server');

const UserType = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String
    avatarUrl: String
    decks: [Deck!]!
    comments: [Comment!]!
  }
`;

module.exports = UserType;
