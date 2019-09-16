import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_DECK_LIST } from './graphql';
import { GET_AUTH_DATA } from '../../graphql';

import DeckListItem from './DeckListItem/DeckListItem';
import AddDeckForm from './AddDeckForm/AddDeckForm';

import classes from './DeckList.module.scss';

const Decks = props => {
  const [addDeck, toggleAddDeck] = useState(false);
  const [deckFilter, setDeckFilter] = useState('myDecks');
  const [deckList, setDeckList] = useState([]);

  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });

  const { currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  const GetDeckListQueryResponse = useQuery(GET_DECK_LIST, {
    fetchPolicy: 'cache-and-network',
    onCompleted() {
      const deckList = GetDeckListQueryResponse.data.getAllDecks.sort((a, b) => {
        if (a.format.toLowerCase() < b.format.toLowerCase()) {
          return -1;
        }

        if (a.format.toLowerCase() > b.format.toLowerCase()) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });
      setDeckList(deckList);
    }
  });

  let filteredDeckList = deckList;

  if (deckFilter === 'myDecks') {
    filteredDeckList = deckList.filter(deck => {
      return deck.owner.id === currentUserId;
    });
  }

  if (GetDeckListQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.DeckList}>
      <div>
        <button type='button' disabled={deckFilter === 'myDecks'} onClick={() => setDeckFilter('myDecks')}>
          My Decks
        </button>
        <button type='button' disabled={deckFilter === 'allDecks'} onClick={() => setDeckFilter('allDecks')}>
          All Decks
        </button>
      </div>
      <h1>DeckList</h1>
      {filteredDeckList.length === 0 ? (
        <h1>No Decks Found</h1>
      ) : (
        filteredDeckList.length > 0 &&
        filteredDeckList.map(deck => {
          return <DeckListItem deck={deck} key={deck.id} currentUserId={currentUserId} />;
        })
      )}
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
