import gql from 'graphql-tag';

export const GET_AUTH_DATA = gql`
  query GetAuthData {
    AuthData @client {
      currentUserId
    }
  }
`;

export const DELETE_DECK = gql`
  mutation DeleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId)
  }
`;
