import gql from 'graphql-tag';

export const GET_DECK_LIST = gql`
  query GetDeckList {
    getUserById {
      decks {
        id
        name
        format
        commander {
          name
        }
        cardList {
          quantity
        }
      }
    }
  }
`;
