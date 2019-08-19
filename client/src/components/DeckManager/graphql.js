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
        mainDeckCount
        sideboardCount
      }
    }
  }
`;

export const UPDATE_CARD_LIST = gql`
  mutation UpdateCardList($deckId: ID!, $cardList: [CardSummaryInput!]!) {
    updateCardList(deckId: $deckId, cardList: $cardList)
  }
`;
