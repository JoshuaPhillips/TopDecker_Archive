import gql from 'graphql-tag';

export const DELETE_DECK = gql`
  mutation DeleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId)
  }
`;
