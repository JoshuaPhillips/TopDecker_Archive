const { gql } = require('apollo-server');

const DeckType = gql`
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
    cardList: [CardWithQuantity!]!
    sideboard: [CardWithQuantity!]!
    comments: [Comment!]!
  }
`;

module.exports = DeckType;
