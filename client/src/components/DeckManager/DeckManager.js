import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_DETAILS, UPDATE_CARD_LIST } from './graphql';

import AddCardSidebar from './AddCardSidebar/AddCardSidebar';
import DeckGallery from './DeckGallery/DeckGallery';
import { sortCardList } from '../../utils/sortCardList';

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

  const updateCardList = (updatedCard, cardCounts) => {
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

    setDeck(newDeck);
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
