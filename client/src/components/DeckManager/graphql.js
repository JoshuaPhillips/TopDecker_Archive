import gql from 'graphql-tag';

export const GET_DECK_DETAILS = gql`
  query GetDeckDetails($deckId: ID!) {
    getDeckById(deckId: $deckId) {
      name
      format
      commander {
        name
      }
      cardList {
        scryfallId
        quantity
      }
    }
  }
`;

export const ADD_CARD_TO_DECK = gql`
  mutation AddCardToDeck($deckId: ID!, $cardScryfallId: ID!) {
    addCardToDeck(deckId: $deckId, cardScryfallId: $cardScryfallId) {
      name
      format
    }
  }
`;
