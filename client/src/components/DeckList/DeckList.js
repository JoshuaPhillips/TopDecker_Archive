import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_DECK_LIST } from './graphql';

import DeckListItem from './DeckListItem/DeckListItem';
import AddDeckForm from './AddDeckForm/AddDeckForm';

import classes from './DeckList.module.scss';

const Decks = props => {
  const [addDeck, toggleAddDeck] = useState(false);

  const GetDeckListQueryResponse = useQuery(GET_DECK_LIST);

  if (GetDeckListQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }

  const { decks } = GetDeckListQueryResponse.data.getUserById;

  return (
    <main className={classes.DeckList}>
      <h1>DeckList</h1>
      {decks.length === 0 && <h1>No Decks Found</h1>}
      {decks.length > 0 &&
        decks.map(deck => {
          return <DeckListItem deck={deck} key={deck.id} />;
        })}
      <hr />
      {!addDeck && (
        <button type='button' onClick={() => toggleAddDeck(true)}>
          Add Deck
        </button>
      )}
      {addDeck && (
        <React.Fragment>
          <AddDeckForm />
          <button type='button' onClick={() => toggleAddDeck(false)}>
            Cancel
          </button>
        </React.Fragment>
      )}
    </main>
  );
};

export default Decks;
