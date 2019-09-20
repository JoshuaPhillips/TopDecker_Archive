import React, { useState } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { SEARCH_CARDS } from './graphql';

import Card from '../../Card/Card';

const AddCardSidebar = props => {
  const {
    deck: { cardList, commander, format }
  } = props;
  const maxCardAllowance = format === 'commander' ? 1 : 4;

  const client = useApolloClient();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [nameSearch, setNameSearch] = useState('');

  const searchCards = async submitEvent => {
    submitEvent.preventDefault();
    const { data } = await client.query({
      query: SEARCH_CARDS,
      skip: nameSearch.length < 3,
      variables: {
        searchParams: {
          name: nameSearch,
          ...defaultParams
        }
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  const defaultParams = {
    formats: [
      {
        format: format,
        legality: 'legal'
      }
    ]
  };

  if (format === 'commander') {
    defaultParams.commander = commander.color_identity;
  }

  let matchedCardCounts = {
    mainDeckCount: 0,
    sideboardCount: 0
  };

  if (selectedCard) {
    const matchedCard = cardList.find(({ card }) => {
      return card.scryfall_id === selectedCard.scryfall_id;
    });

    if (matchedCard) {
      matchedCardCounts.mainDeckCount = matchedCard.mainDeckCount;
      matchedCardCounts.sideboardCount = matchedCard.sideboardCount;
    }
  }

  return (
    <div style={{ width: '15%', overflowX: 'scroll' }}>
      <h1>Quick Search</h1>
      <div>
        {searchResults.length !== 0 && (
          <React.Fragment>
            {searchResults.map(result => {
              return <Card key={result.scryfall_id} card={result} onClick={() => setSelectedCard(result)} />;
            })}
            <button
              type='button'
              onClick={() => {
                setSearchResults([]);
              }}>
              Clear Results
            </button>
          </React.Fragment>
        )}
      </div>

      <form onSubmit={searchCards}>
        <input
          type='text'
          placeholder='Card Name...'
          value={nameSearch}
          onChange={e => setNameSearch(e.target.value)}
        />

        <button type='submit' disabled={nameSearch.length < 3}>
          Search
        </button>
      </form>
      <button
        type='button'
        disabled={
          !selectedCard || matchedCardCounts.mainDeckCount + matchedCardCounts.sideboardCount === maxCardAllowance
        }
        onClick={() => {
          props.updateCardListHandler(props.deck, 'mainDeck', 'add', selectedCard);
        }}>
        Add Card
      </button>

      {format !== 'commander' && (
        <button
          type='button'
          disabled={
            !selectedCard || matchedCardCounts.mainDeckCount + matchedCardCounts.sideboardCount === maxCardAllowance
          }
          onClick={() => {
            props.updateCardListHandler(props.deck, 'sideboard', 'add', selectedCard);
          }}>
          Add Card to Sideboard
        </button>
      )}
    </div>
  );
};

export default AddCardSidebar;
