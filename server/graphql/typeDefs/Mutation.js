const { gql } = require('apollo-server');

const MutationType = gql`
  input CreateUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    avatarUrl: String
  }
  input UserDetailsInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    avatarUrl: String
  }

  input CreateDeckInput {
    name: String!
    format: Format!
    commander: String
  }

  input CardSummaryInput {
    scryfallId: ID!
    mainDeckCount: Int!
    sideboardCount: Int!
  }

  input DeckDetailsInput {
    owner: ID
    name: String
    format: Format
    commander: String
    cardList: [CardSummaryInput]
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): AuthResponse!
    editUser(newDetails: UserDetailsInput!): User!
    deleteUser(password: String!): Boolean!
    changePassword(currentPassword: String!, newPassword: String!, confirmationPassword: String!): User!

    createDeck(deckDetails: CreateDeckInput!): Deck!
    editDeck(deckId: ID!, newDetails: DeckDetailsInput!): Deck!
    deleteDeck(deckId: ID!): ID!

    updateCardList(deckId: ID!, cardList: [CardSummaryInput]!): Boolean!

    createComment(deckId: ID!, commentText: String!): Comment!
    editComment(commentId: ID!, newText: String!): Comment!
    deleteComment(commentId: ID!): Boolean!
  }
`;
module.exports = MutationType;
