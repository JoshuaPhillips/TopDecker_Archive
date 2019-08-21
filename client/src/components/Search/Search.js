import React, { useState } from 'react';

import Card from '../Card/Card';

import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { SEARCH_CARDS } from '../DeckManager/QuickSearchSidebar/graphql';
import { GET_USER_DECKS } from './graphql';

import classes from './Search.module.scss';
import { generateCardList } from '../../utils/generateNewDeck';
import { UPDATE_CARD_LIST } from '../DeckManager/graphql';

const Search = props => {
  const [deckList, setDeckList] = useState([]);
  const [selectedDeckId, setDeck] = useState(props.location.state ? props.location.state.deck.id : 'default');
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

  const [UpdateCardListMutation] = useMutation(UPDATE_CARD_LIST);

  const addCardToDeck = (listToUpdate, updatedCard) => {
    const deck = deckList.find(({ id }) => {
      return id === selectedDeckId;
    });

    const newDeck = generateCardList(deck, listToUpdate, 'add', updatedCard);

    const filteredCardList = newDeck.cardList.map(({ card, mainDeckCount, sideboardCount }) => {
      return { scryfallId: card.scryfall_id, mainDeckCount, sideboardCount };
    });

    UpdateCardListMutation({ variables: { deckId: selectedDeckId, cardList: filteredCardList } });
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
        <select value={selectedDeckId} onChange={e => setDeck(e.target.value)}>
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
                <button
                  type='button'
                  disabled={selectedDeckId === 'default'}
                  onClick={() => addCardToDeck('mainDeck', result)}>
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
