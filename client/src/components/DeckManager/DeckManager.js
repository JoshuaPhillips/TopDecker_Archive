import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_DETAILS, UPDATE_CARD_LIST } from './graphql';

import AddCardSidebar from './AddCardSidebar/AddCardSidebar';
import DeckGallery from './DeckGallery/DeckGallery';

import classes from './DeckManager.module.scss';

const DeckManager = props => {
  const { deckId: currentDeckId } = props.match.params;
  const [deck, setDeck] = useState(null);

  // ========== GET THE CARD DETAILS ========== //

  const GetDeckDetailsQueryResponse = useQuery(GET_DECK_DETAILS, {
    skip: !currentDeckId,
    variables: { deckId: currentDeckId },
    fetchPolicy: 'cache-and-network',
    onCompleted() {
      setDeck(GetDeckDetailsQueryResponse.data.getDeckById);
    }
  });

  // ========== UPDATING CARDS ========== //

  const [UpdateCardListMutation] = useMutation(UPDATE_CARD_LIST);

  const updateCardList = (updatedCard, quantity) => {
    const cardList = deck.cardList;
    let newDeck = {
      ...deck,
      cardList: [...deck.cardList]
    };

    const maximumCardAllowance = deck.format === 'commander' ? 1 : 4;

    if (quantity > maximumCardAllowance || quantity < 0) {
      console.log('Cant change to quantity of ', quantity);
      return;
    }

    // Find matching card, if it exists.
    const matchedCardIndex = cardList.findIndex(({ card }) => {
      return card.scryfall_id === updatedCard.scryfall_id;
    });

    // Card does not exist and we want a non-zero quantity, add the card.
    if (matchedCardIndex === -1 && quantity !== 0) {
      // Change the local state first
      newDeck.cardList.push({ card: updatedCard, quantity: quantity });
    }

    // Card exists and we want a non-zero quantity, set the quantity.
    if (matchedCardIndex !== -1 && quantity !== 0) {
      newDeck.cardList[matchedCardIndex].quantity = quantity;
    }

    // Card exists and we want zero. Delete the card.

    if (matchedCardIndex !== -1 && quantity === 0) {
      newDeck.cardList = deck.cardList.filter(({ card }) => {
        return card.scryfall_id !== updatedCard.scryfall_id;
      });
    }

    setDeck(newDeck);
    const filteredCardList = newDeck.cardList.map(({ card, quantity }) => {
      return { scryfallId: card.scryfall_id, quantity: quantity };
    });
    UpdateCardListMutation({ variables: { deckId: currentDeckId, cardList: filteredCardList } });
  };

  // ========== RENDER ========== //

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.DeckManager}>
      {deck && <AddCardSidebar updateCardListHandler={updateCardList} deck={deck} />}
      {deck && <DeckGallery updateCardListHandler={updateCardList} deck={deck} />}
    </main>
  );
};

export default withRouter(DeckManager);
