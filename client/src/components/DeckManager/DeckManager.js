import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_DETAILS, UPDATE_CARD_LIST } from './graphql';

import AddCardSidebar from './QuickSearchSidebar/QuickSearchSidebar';
import DeckGallery from './DeckGallery/DeckGallery';
import { sortCardList } from '../../utils/sortCardList';
import { generateCardList } from '../../utils/generateNewDeck';

import classes from './DeckManager.module.scss';

const DeckManager = props => {
  const { deckId: currentDeckId } = props.match.params;
  const [deck, setDeck] = useState(null);
  const [sortMode, setSortMode] = useState('alphabetical');

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

  // ========== RENDER ========== //

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.DeckManager}>
      {deck && <AddCardSidebar deck={deck} updateCardListHandler={updateCardList} />}
      {deck && (
        <DeckGallery
          deck={deck}
          sortMode={sortMode}
          changeSortModeHandler={changeSortMode}
          updateCardListHandler={updateCardList}
        />
      )}
    </main>
  );
};

export default withRouter(DeckManager);
