import gql from 'graphql-tag';

export const GET_DECK_LIST = gql`
  query GetDeckList {
    getAllDecks {
      id
      name
      format
      owner {
        id
        username
      }
      commander {
        name
      }
      cardList {
        mainDeckCount
        sideboardCount
      }
    }
  }
`;

export const DELETE_DECK = gql`
  mutation DeleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId)
  }
`;
