import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_DETAILS, ADD_CARD_TO_DECK } from './graphql';

import AddCardSidebar from './AddCardSidebar/AddCardSidebar';
import DeckGallery from './DeckGallery/DeckGallery';

import classes from './DeckManager.module.scss';

const DeckManager = props => {
  const { deckId: currentDeckId } = props.match.params;
  const [deck, setDeck] = useState(null);

  const GetDeckDetailsQueryResponse = useQuery(GET_DECK_DETAILS, {
    skip: !currentDeckId,
    variables: { deckId: currentDeckId },
    onCompleted() {
      setDeck(GetDeckDetailsQueryResponse.data.getDeckById);
    }
  });

  const [AddCardMutation] = useMutation(ADD_CARD_TO_DECK, {
    variables: { deckId: currentDeckId }
  });

  const onAddCard = newCard => {
    setDeck({ ...deck, cardList: [...deck.cardList, { card: newCard, quantity: 1 }] });
    AddCardMutation({ variables: { cardScryfallId: newCard.scryfall_id } });
  };

  if (GetDeckDetailsQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.DeckManager}>
      {deck && <AddCardSidebar addCardHandler={onAddCard} deck={deck} />}
      {deck && <DeckGallery deck={deck} />}
    </main>
  );
};

export default withRouter(DeckManager);
