const { gql } = require('apollo-server');

const DeckType = gql`
  type CardList {
    scryfallId: ID!
    quantity: Int!
  }

  enum Format {
    standard
    future
    frontier
    modern
    legacy
    pauper
    vintage
    penny
    commander
    duel
    oldschool
  }

  type Deck {
    id: ID!
    name: String!
    owner: User!
    format: Format!
    commander: Card
    cardList: [CardList!]!
    sideboard: [CardList!]!
    comments: [Comment!]!
  }
`;

module.exports = DeckType;
