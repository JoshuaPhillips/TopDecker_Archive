const { gql } = require('apollo-server');

const SetType = gql`
  type Set {
    name: String!
    code: String!
  }
`;

module.exports = SetType;
