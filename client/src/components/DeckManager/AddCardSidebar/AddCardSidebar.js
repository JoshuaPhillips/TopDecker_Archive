import React, { useState } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { SEARCH_CARDS } from './graphql';
import { GET_DECK_DETAILS } from '../graphql';

import Card from '../../Card/Card';

const AddCardSidebar = props => {
  const client = useApolloClient();
  const [searchParams, setSearchParams] = useState({ name: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  const searchCards = async () => {
    const { data } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  return (
    <div style={{ width: '15%', overflowX: 'scroll' }}>
      <h1>AddCardSidebar</h1>
      <div>
        {searchResults.length !== 0 &&
          searchResults.map(result => {
            return <Card key={result.scryfall_id} card={result} onClick={() => setSelectedCard(result.scryfall_id)} />;
          })}
      </div>
      <form>
        <label htmlFor='name'>Card Name</label>
        <input
          type='text'
          id='name'
          value={searchParams.name}
          onChange={e => setSearchParams({ ...searchParams, name: e.target.value })}
        />

        <button type='button' onClick={() => searchCards()}>
          Search
        </button>
      </form>

      <button
        type='button'
        disabled={!selectedCard}
        onClick={() =>
          props.onAddCard({
            variables: { cardScryfallId: selectedCard },
            optimisticResponse: {
              __typename: 'Mutation',
              addCardToDeck: {
                __typename: 'CardOverview',
                scryfallId: selectedCard,
                quantity: 1
              }
            },
            update: (store, { data: { addCardToDeck } }) => {
              const data = store.readQuery({ query: GET_DECK_DETAILS, variables: { deckId: props.deckId } });

              const newData = {
                ...data,
                getDeckById: {
                  ...data.getDeckById,
                  cardList: [...data.getDeckById.cardList, addCardToDeck]
                }
              };
              store.writeQuery({ query: GET_DECK_DETAILS, variables: { deckId: props.deckId }, data: newData });
            }
          })
        }>
        Add Card
      </button>
    </div>
  );
};

export default AddCardSidebar;
