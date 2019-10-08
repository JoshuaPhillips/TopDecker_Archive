import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTH_DATA, GET_DECK_DETAILS, UPDATE_CARD_LIST } from './graphql';

import DeckManagerSidebar from './DeckManagerSidebar/DeckManagerSidebar';
import DeckInspector from './DeckInspector/DeckInspector';
import { sortCardList } from '../../utils/sortCardList';
import { generateCardList } from '../../utils/generateNewDeck';

import classes from './DeckManager.module.scss';

const DeckManager = props => {
  const { deckId: currentDeckId } = props.match.params;
  const [deck, setDeck] = useState(null);
  const [filters, setFilters] = useState({
    creature: true,
    planeswalker: true,
    artifact: true,
    enchantment: true,
    sorcery: true,
    instant: true,
    land: true
  });
  const [sortMode, setSortMode] = useState('alphabetical');

  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });
  const { currentUserId } = GetAuthDataQueryResponse.data.AuthData;
  const deckOwnerId = deck ? deck.owner.id : null;
  const currentUserOwnsDeck = currentUserId === deckOwnerId;

  // ========== GET THE CARD DETAILS ========== //

  const GetDeckDetailsQueryResponse = useQuery(GET_DECK_DETAILS, {
    skip: !currentDeckId,
    variables: { deckId: currentDeckId },
    fetchPolicy: 'cache-and-network',
    onCompleted() {
      const sortedDeck = {
        ...GetDeckDetailsQueryResponse.data.getDeckById,
        cardList: sortCardList(GetDeckDetailsQueryResponse.data.getDeckById.cardList, sortMode)
      };

      setDeck(sortedDeck);
    }
  });

  // ========== SORTING CARDS ========== //

  const changeSortMode = newSortMode => {
    setSortMode(newSortMode);
    const newDeck = {
      ...deck,
      cardList: sortCardList(deck.cardList, newSortMode)
    };

    setDeck(newDeck);
  };

  // ========== UPDATING CARDS ========== //

  const [UpdateCardListMutation] = useMutation(UPDATE_CARD_LIST);

  const updateCardList = (deck, listToUpdate, updateMode, updatedCard) => {
    const newDeck = generateCardList(deck, listToUpdate, updateMode, updatedCard);
    setDeck({ ...newDeck, cardList: sortCardList(newDeck.cardList, sortMode) });

    const filteredCardList = newDeck.cardList.map(({ card, mainDeckCount, sideboardCount }) => {
      return { scryfallId: card.scryfall_id, mainDeckCount, sideboardCount };
    });

    UpdateCardListMutation({ variables: { deckId: currentDeckId, cardList: filteredCardList } });
  };

  // ========== TOGGLE FILTERS ========== //

  const toggleFilter = filter => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  // ========== RENDER ========== //

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.DeckManager}>
      {deck && currentUserOwnsDeck && <DeckManagerSidebar deck={deck} updateCardListHandler={updateCardList} />}
      {deck && (
        <DeckInspector
          currentUserOwnsDeck={currentUserOwnsDeck}
          deck={deck}
          filters={filters}
          sortMode={sortMode}
          changeSortModeHandler={changeSortMode}
          updateCardListHandler={updateCardList}
          toggleFilterHandler={toggleFilter}
        />
      )}
    </main>
  );
};

export default withRouter(DeckManager);
