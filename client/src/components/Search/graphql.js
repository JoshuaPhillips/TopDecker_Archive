import gql from 'graphql-tag';

export const GET_USER_DECKS = gql`
  query GetUserDecks {
    getCurrentUser {
      decks {
        id
        name
        format
        commander {
          scryfall_id
          color_identity
        }
        cardList {
          card {
            scryfall_id
          }
          mainDeckCount
          sideboardCount
        }
      }
    }
  }
`;
