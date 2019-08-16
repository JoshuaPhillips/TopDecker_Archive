const { gql } = require('apollo-server');

const CardType = gql`
  enum Rarity {
    common
    uncommon
    rare
    mythic
  }

  type CardLegalities {
    standard: String!
    future: String!
    frontier: String!
    modern: String!
    legacy: String!
    pauper: String!
    vintage: String!
    penny: String!
    commander: String!
    duel: String!
    oldschool: String!
  }

  type ImageUris {
    small: String
    normal: String
    large: String
    png: String
    art_crop: String
    border_crop: String
  }

  type CardFace {
    name: String!
    colors: [String]
    image_uris: ImageUris
    loyalty: String
    oracle_text: String!
    power: String
    toughness: String
    type_line: String
  }

  type Card {
    scryfall_id: ID!
    name: String!
    layout: String!
    cmc: String
    colors: [String!]!
    color_identity: [String!]!
    legalities: CardLegalities!
    loyalty: String
    mana_cost: String
    lang: String!
    oracle_text: String
    power: String
    toughness: String
    type_line: String!
    image_uris: ImageUris
    rarity: Rarity!
    set_name: String!
    card_faces: [CardFace]
  }
`;

module.exports = CardType;
