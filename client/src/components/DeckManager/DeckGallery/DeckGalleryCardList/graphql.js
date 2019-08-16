import gql from 'graphql-tag';

export const GET_CARDS_DETAILS = gql`
  query GetCardsDetails($cardList: [CardListInput!]!) {
    getCardsByScryfallIds(cardList: $cardList) {
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
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($deckId: ID!, $scryfallId: ID!) {
    deleteCard(deckId: $deckId, scryfallId: $scryfallId)
  }
`;
