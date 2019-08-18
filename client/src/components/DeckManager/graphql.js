import gql from 'graphql-tag';

export const GET_DECK_DETAILS = gql`
  query GetDeckDetails($deckId: ID!) {
    getDeckById(deckId: $deckId) {
      id
      name
      format
      commander {
        name
        color_identity
      }
      cardList {
        card {
          scryfall_id
          name
          layout
          image_uris {
            large
          }
          card_faces {
            image_uris {
              large
            }
          }
        }
        quantity
      }
    }
  }
`;

export const ADD_CARD_TO_DECK = gql`
  mutation AddCardToDeck($deckId: ID!, $scryfallId: ID!) {
    addCardToDeck(deckId: $deckId, scryfallId: $scryfallId)
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($deckId: ID!, $scryfallId: ID!) {
    deleteCard(deckId: $deckId, scryfallId: $scryfallId)
  }
`;

export const UPDATE_CARD_LIST = gql`
  mutation UpdateCardList($deckId: ID!, $cardList: [CardWithQuantityInput!]!) {
    updateCardList(deckId: $deckId, cardList: $cardList)
  }
`;
