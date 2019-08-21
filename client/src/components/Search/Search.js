import React, { useState } from 'react';

import Card from '../Card/Card';

import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { SEARCH_CARDS } from '../DeckManager/QuickSearchSidebar/graphql';
import { GET_USER_DECKS } from './graphql';

import classes from './Search.module.scss';

const Search = props => {
  const [deck, setDeck] = useState(props.location.state ? props.location.state.deck.id : 'default');
  const [deckList, setDeckList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: ''
  });

  const client = useApolloClient();

  const searchCards = async () => {
    const { data } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  const GetUserDecksQueryResponse = useQuery(GET_USER_DECKS, {
    onCompleted(data) {
      setDeckList(data.getCurrentUser.decks);
    }
  });

  const updateCardList = (deck, updatedCard, cardCounts) => {
    const cardList = deck.cardList;
    let newDeck = {
      ...deck,
      cardList: [...deck.cardList]
    };

    const maximumCardAllowance = deck.format === 'commander' ? 1 : 4;
    const totalCount = cardCounts.mainDeckCount + cardCounts.sideboardCount;

    if (
      cardCounts.mainDeckCount + cardCounts.sideboardCount > maximumCardAllowance ||
      cardCounts.mainDeckCount < 0 ||
      cardCounts.sideboardCount < 0
    ) {
      return;
    }

    // Find matching card, if it exists.
    const matchedCardIndex = cardList.findIndex(({ card }) => {
      return card.scryfall_id === updatedCard.scryfall_id;
    });

    // Card does not exist and we want a non-zero quantity, add the card.
    if (matchedCardIndex === -1 && totalCount !== 0) {
      newDeck.cardList.push({
        card: updatedCard,
        mainDeckCount: cardCounts.mainDeckCount,
        sideboardCount: cardCounts.sideboardCount
      });
    }

    // Card exists and we want a non-zero quantity, set the quantity.
    if (matchedCardIndex !== -1 && totalCount !== 0) {
      newDeck.cardList[matchedCardIndex].mainDeckCount = cardCounts.mainDeckCount;
      newDeck.cardList[matchedCardIndex].sideboardCount = cardCounts.sideboardCount;
    }

    // Card exists and we want zero. Delete the card.
    if (matchedCardIndex !== -1 && totalCount === 0) {
      newDeck.cardList = deck.cardList.filter(({ card }) => {
        return card.scryfall_id !== updatedCard.scryfall_id;
      });
    }

    // const filteredCardList = newDeck.cardList.map(({ card, mainDeckCount, sideboardCount }) => {
    //   return { scryfallId: card.scryfall_id, mainDeckCount, sideboardCount };
    // });
    // UpdateCardListMutation({ variables: { deckId: currentDeckId, cardList: filteredCardList } });
  };

  return (
    <main className={classes.Search}>
      <div className={classes.SearchFormContainer}>
        <h1>Search</h1>
        <form>
          <input
            type='text'
            placeholder='Card Name'
            value={searchParams.name}
            onChange={e => setSearchParams({ ...searchParams, name: e.target.value })}
          />
          <button type='button' onClick={() => searchCards()}>
            Search
          </button>
        </form>
      </div>
      <div className={classes.SearchResultsContainer}>
        <h1>Search Results</h1>
        <p>Add Cards to: </p>
        <select value={deck} onChange={e => setDeck(e.target.value)}>
          <option value='default' disabled>
            {GetUserDecksQueryResponse.loading && GetUserDecksQueryResponse.called
              ? 'Loading decks...'
              : 'Select a Deck to Edit...'}
          </option>
          {deckList &&
            deckList.map(deck => {
              return (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              );
            })}
        </select>
        <div className={classes.SearchResultsCardListContainer}>
          {searchResults.map(result => {
            return (
              <div key={result.scryfall_id}>
                <Card card={result} />
                <button type='button' disabled={deck === 'default'}>
                  Add to Deck
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Search;
