import gql from 'graphql-tag';

export const GET_COMMANDER_SEARCH_RESULTS = gql`
  query GetCommanderSearchResults($searchParams: SearchParamsInput) {
    searchCards(searchParams: $searchParams) {
      cards {
        scryfall_id
        name
      }
    }
  }
`;

export const CREATE_NEW_DECK = gql`
  mutation CreateNewDeck($deckDetails: CreateDeckInput!) {
    createDeck(deckDetails: $deckDetails) {
      id
      name
    }
  }
`;
