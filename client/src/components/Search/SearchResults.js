import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER_DECKS } from './graphql';
import { UPDATE_CARD_LIST } from '../DeckManager/graphql';

import { generateCardList } from '../../utils/generateCardList';

import { SearchResultsWrapper, SearchResultsToolbar, SearchResultsCardListContainer } from './styles';

import { SectionHeader } from '../../shared/Headers';
import { Button } from '../../shared/Buttons';
import { ModeToggleContainer } from '../../shared/ModeToggles';
import { StyledSelect } from '../../shared/Forms';
import SearchResultGalleryItem from './SearchResultGalleryItem';
import SearchResultTextItem from './SearchResultTextItem';
import SearchResultListItem from './SearchResultListItem';

const SearchResults = props => {
  const { searchResults } = props;
  const [deckList, setDeckList] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState('default');
  const [viewMode, setViewMode] = useState('gallery');

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

  let deck;

  if (selectedDeckId) {
    deck = deckList.find(({ id }) => {
      return id === selectedDeckId;
    });
  }

  return (
    <SearchResultsWrapper>
      <SectionHeader>Search Results</SectionHeader>
      <SearchResultsToolbar>
        <div>
          <StyledSelect value={selectedDeckId} onChange={e => setSelectedDeckId(e.target.value)}>
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
          </StyledSelect>
        </div>
        <div>
          <ModeToggleContainer>
            <button type='button' disabled={viewMode === 'gallery'} onClick={() => setViewMode('gallery')}>
              Gallery
            </button>
            <button type='button' disabled={viewMode === 'text'} onClick={() => setViewMode('text')}>
              Text
            </button>
            <button type='button' disabled={viewMode === 'list'} onClick={() => setViewMode('list')}>
              List
            </button>
          </ModeToggleContainer>
        </div>

        <div>
          <Button type='button' disabled={selectedDeckId === 'default'}>
            <NavLink to={`/decks/${selectedDeckId}`}>
              <FontAwesomeIcon icon={faArrowRight} fixedWidth />
              Go to Deck
            </NavLink>
          </Button>
        </div>
      </SearchResultsToolbar>
      <SearchResultsCardListContainer>
        {searchResults.map(result => {
          return viewMode === 'gallery' ? (
            <SearchResultGalleryItem
              key={result.scryfall_id}
              result={result}
              deck={deck}
              updateCardListHandler={updateCardListHandler}
            />
          ) : viewMode === 'text' ? (
            <SearchResultTextItem
              key={result.scryfall_id}
              result={result}
              deck={deck}
              updateCardListHandler={updateCardListHandler}
            />
          ) : (
            <SearchResultListItem
              key={result.scryfall_id}
              result={result}
              deck={deck}
              updateCardListHandler={updateCardListHandler}
            />
          );
        })}
      </SearchResultsCardListContainer>
    </SearchResultsWrapper>
  );
};

export default SearchResults;
