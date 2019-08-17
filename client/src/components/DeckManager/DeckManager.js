import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_DETAILS, ADD_CARD_TO_DECK, DELETE_CARD } from './graphql';

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

  // ========== ADDING CARDS ========== //

  const [AddCardMutation] = useMutation(ADD_CARD_TO_DECK, {
    variables: { deckId: currentDeckId }
  });

  const onAddCard = newCard => {
    const maximumCardAllowance = deck.format === 'commander' ? 1 : 4;

    const matchedCardIndex = deck.cardList.findIndex(({ card }) => {
      return card.scryfall_id === newCard.scryfall_id;
    });

    if (matchedCardIndex === -1) {
      const newDeck = {
        ...deck,
        cardList: [...deck.cardList, { card: newCard, quantity: 1 }]
      };

      setDeck(newDeck);

      AddCardMutation({ variables: { scryfallId: newCard.scryfall_id } });
      return;
    }

    if (deck.cardList[matchedCardIndex].quantity === maximumCardAllowance) {
      console.log("Can't add more cards.");
      return;
    }

    const newDeck = {
      ...deck,
      cardList: [...deck.cardList]
    };

    newDeck.cardList[matchedCardIndex].quantity += 1;

    setDeck(newDeck);

    AddCardMutation({ variables: { scryfallId: newCard.scryfall_id } });
  };

  // ========== DELETING CARDS ========== //

  const [DeleteCardMutation] = useMutation(DELETE_CARD, {
    variables: { deckId: currentDeckId }
  });

  const onDeleteCard = scryfallId => {
    const newCardList = deck.cardList.filter(({ card }) => {
      return card.scryfall_id !== scryfallId;
    });

    const newDeck = {
      ...deck,
      cardList: newCardList
    };

    setDeck(newDeck);
    DeleteCardMutation({ variables: { scryfallId: scryfallId } });
  };

  // ========== RENDER ========== //

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.DeckManager}>
      {deck && <AddCardSidebar addCardHandler={onAddCard} deck={deck} />}
      {deck && <DeckGallery deleteCardHandler={onDeleteCard} deck={deck} />}
    </main>
  );
};

export default withRouter(DeckManager);
