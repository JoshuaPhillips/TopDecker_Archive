import React, { useState } from 'react';

import Card from '../Card/Card';
import SearchForm from './SearchForm.js';
import SearchResultCardControls from './SearchResultCardControls/SearchResultCardControls';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER_DECKS } from './graphql';
import { UPDATE_CARD_LIST } from '../DeckManager/graphql';

import { generateCardList } from '../../utils/generateCardList';

import { StyledSearch } from './styles';
import { SectionHeader } from '../../shared/Headers';

import classes from './Search.module.scss';
const Search = props => {
  const [deckList, setDeckList] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(props.location.state ? props.location.state.deck.id : 'default');
  const [searchResults, setSearchResults] = useState([]);

  const GetUserDecksQueryResponse = useQuery(GET_USER_DECKS, {
    onCompleted(data) {
      if (data) {
        setDeckList(data.getCurrentUser.decks);
      }
    }
  });

  const [UpdateCardListMutation] = useMutation(UPDATE_CARD_LIST);

  const updateCardListHandler = (listToUpdate, updateMode, updatedCard) => {
    const newDeck = generateCardList(deck, listToUpdate, updateMode, updatedCard);

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
    <StyledSearch>
      <SearchForm setSearchResults={setSearchResults} />
      <div className={classes.SearchResultsContainer}>
        <SectionHeader>Search Results</SectionHeader>
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
                <SearchResultCardControls deck={deck} result={result} updateCardList={updateCardListHandler} />
              </div>
            );
          })}
        </div>
      </div>
    </StyledSearch>
  );
};

export default Search;
