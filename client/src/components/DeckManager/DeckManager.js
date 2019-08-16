import React from 'react';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_DETAILS, ADD_CARD_TO_DECK } from './graphql';

import AddCardSidebar from './AddCardSidebar/AddCardSidebar';
import DeckGallery from './DeckGallery/DeckGallery';

import classes from './DeckManager.module.scss';

const DeckManager = props => {
  const { deckId: currentDeckId } = props.match.params;

  const GetDeckDetailsQueryResponse = useQuery(GET_DECK_DETAILS, {
    skip: !currentDeckId,
    variables: { deckId: currentDeckId }
  });

  const [AddCardMutation, AddCardMutationResponse] = useMutation(ADD_CARD_TO_DECK, {
    variables: { deckId: currentDeckId },
    onCompleted() {
      if (AddCardMutationResponse.loading) {
        return;
      }
      console.log(AddCardMutationResponse);
    },
    refetchQueries: [{ query: GET_DECK_DETAILS, variables: { deckId: currentDeckId } }]
  });

  if (GetDeckDetailsQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }

  const { getDeckById: deck } = GetDeckDetailsQueryResponse.data;

  return (
    <main className={classes.DeckManager}>
      <AddCardSidebar onAddCard={AddCardMutation} />
      <DeckGallery deck={deck} currentDeckId={currentDeckId} />
    </main>
  );
};

export default withRouter(DeckManager);
