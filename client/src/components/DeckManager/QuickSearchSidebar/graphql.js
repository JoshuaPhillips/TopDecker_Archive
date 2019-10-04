import gql from 'graphql-tag';

export const SEARCH_CARDS = gql`
  query SearchCards($searchParams: SearchParamsInput!) {
    searchCards(searchParams: $searchParams) {
      total_cards
      cards {
        scryfall_id
        name
        cmc
        colors
        mana_cost
        type_line
        rarity
        color_identity
        legalities {
          standard
          modern
          commander
        }
        image_uris {
          large
        }
        layout
        card_faces {
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
      }
    }
  }
`;
