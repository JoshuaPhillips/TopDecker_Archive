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

  const searchCards = async () => {
    const { data } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  const searchParams = {
    formats: [
      {
        format: format,
        legality: 'legal'
      }
    ]
  };

  if (format === 'commander') {
    searchParams.commander = commander.color_identity;
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
        {searchResults.length !== 0 &&
          searchResults.map(result => {
            return <Card key={result.scryfall_id} card={result} onClick={() => setSelectedCard(result)} />;
          })}
      </div>

      <form>
        <input
          type='text'
          placeholder='Card Name...'
          value={searchParams.name}
          onChange={e => (searchParams.name = e.target.value)}
        />

        <button type='button' onClick={() => searchCards()}>
          Search
        </button>
      </form>
      <button
        type='button'
        disabled={
          !selectedCard || matchedCardCounts.mainDeckCount + matchedCardCounts.sideboardCount === maxCardAllowance
        }
        onClick={() => {
          props.updateCardListHandler(selectedCard, {
            mainDeckCount: matchedCardCounts.mainDeckCount + 1,
            sideboardCount: matchedCardCounts.sideboardCount
          });
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
            props.updateCardListHandler(selectedCard, {
              mainDeckCount: matchedCardCounts.mainDeckCount,
              sideboardCount: matchedCardCounts.sideboardCount + 1
            });
          }}>
          Add Card to Sideboard
        </button>
      )}
    </div>
  );
};

export default AddCardSidebar;
