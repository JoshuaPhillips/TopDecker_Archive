const { gql } = require('apollo-server');

const CommentType = gql`
  type Comment {
    id: ID!
    author: User!
    text: String!
    relatedDeck: Deck!
    createdAt: String!
    updatedAt: String
  }
`;

module.exports = CommentType;
