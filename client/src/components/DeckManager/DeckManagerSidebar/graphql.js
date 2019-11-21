import gql from "graphql-tag";

export const SEARCH_CARDS = gql`
  query SearchCards($searchParams: SearchParamsInput!) {
    searchCards(searchParams: $searchParams) {
      total_cards
      has_more
      next_page
      cards {
        scryfall_id
        name
        cmc
        colors
        mana_cost
        oracle_text
        flavor_text
        power
        toughness
        loyalty
        set
        type_line
        rarity
        color_identity
        layout
        collector_number
        legalities {
          standard
          modern
          commander
        }
        image_uris {
          large
        }
        card_faces {
          mana_cost
          type_line
          name
          oracle_text
          flavor_text
          image_uris {
            large
          }
        }
      }
    }
  }
`;

export const GET_USER_DECKS = gql`
  query GetCurrentUsersDecks {
    getCurrentUser {
      firstName
      decks {
        id
        name
        format
      }
    }
  }
`;
