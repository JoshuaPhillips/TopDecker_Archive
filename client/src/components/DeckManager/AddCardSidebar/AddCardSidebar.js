import React, { useState } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { SEARCH_CARDS } from './graphql';

import Card from '../../Card/Card';

const AddCardSidebar = props => {
  const client = useApolloClient();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const searchParams = {
    formats: [
      {
        format: props.deck.format,
        legality: 'legal'
      }
    ]
  };

  const searchCards = async () => {
    const { data } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  if (props.deck.format === 'commander') {
    searchParams.commander = props.deck.commander.color_identity;
  }

  return (
    <div style={{ width: '15%', overflowX: 'scroll' }}>
      <h1>AddCardSidebar</h1>
      <div>
        {searchResults.length !== 0 &&
          searchResults.map(result => {
            return <Card key={result.scryfall_id} card={result} onClick={() => setSelectedCard(result)} />;
          })}
      </div>
      <form>
        <label htmlFor='name'>Card Name</label>
        <input type='text' id='name' value={searchParams.name} onChange={e => (searchParams.name = e.target.value)} />

        <label htmlFor='text'>Text</label>
        <input type='text' id='text' value={searchParams.text} onChange={e => (searchParams.text = e.target.value)} />

        <label htmlFor='type'>Type</label>
        <select id='type' defaultValue='default' onChange={e => (searchParams.type = e.target.value)}>
          <option value='default' disabled>
            Select a type
          </option>
          <option value='creature'>Creature</option>
        </select>

        <button type='button' onClick={() => searchCards()}>
          Search
        </button>
      </form>

      <button
        type='button'
        disabled={!selectedCard}
        onClick={() => {
          props.addCardHandler(selectedCard);
        }}>
        Add Card
      </button>
    </div>
  );
};

export default AddCardSidebar;
