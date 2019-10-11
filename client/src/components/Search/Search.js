import React, { useState } from 'react';

import Card from '../Card/Card';
import SearchForm from './SearchForm.js';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER_DECKS } from './graphql';
import { UPDATE_CARD_LIST } from '../DeckManager/graphql';

import { generateCardList } from '../../utils/generateNewDeck';
import { validateAddCard } from '../../utils/validateAddCard';

import classes from './Search.module.scss';
const Search = props => {
  const [deckList, setDeckList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(props.location.state ? props.location.state.deck.id : 'default');

  const GetUserDecksQueryResponse = useQuery(GET_USER_DECKS, {
    onCompleted(data) {
      if (data) {
        setDeckList(data.getCurrentUser.decks);
      }
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

    UpdateCardListMutation({
      variables: { deckId: selectedDeckId, cardList: filteredCardList },
      refetchQueries: [{ query: GET_USER_DECKS }]
    });
  };

  const deck = deckList.find(({ id }) => {
    return id === selectedDeckId;
  });

  return (
    <main className={classes.Search}>
      <SearchForm setSearchResults={setSearchResults} />
      <div className={classes.SearchResultsContainer}>
        <h1>Search Results</h1>
        <p>Add Cards to: </p>
        <select value={selectedDeckId} onChange={e => setSelectedDeckId(e.target.value)}>
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
                {deck ? (
                  <React.Fragment>
                    <button
                      type='button'
                      disabled={selectedDeckId === 'default' || !validateAddCard(deck, result, 'mainDeck')}
                      onClick={() => addCardToDeck('mainDeck', result)}>
                      Add to Main Deck
                    </button>
                    {deck.format !== 'commander' && (
                      <button
                        type='button'
                        disabled={selectedDeckId === 'default' || !validateAddCard(deck, result, 'sideboard')}
                        onClick={() => addCardToDeck('sideboard', result)}>
                        Add to Sideboard
                      </button>
                    )}
                  </React.Fragment>
                ) : (
                  <p>Select a deck using the dropdown above.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Search;
