import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DECK_LIST, DELETE_DECK } from './graphql';
import { GET_AUTH_DATA } from '../../graphql';

import DeckListItem from './DeckListItem/DeckListItem';
import AddDeckForm from './AddDeckForm/AddDeckForm';
import Spinner from '../Spinner/Spinner';

import classes from './DeckList.module.scss';

const Decks = () => {
  const [addDeck, toggleAddDeck] = useState(false);
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

  const [DeleteDeckMutation] = useMutation(DELETE_DECK, {
    refetchQueries: [{ query: GET_DECK_LIST }],
    onCompleted(data) {
      if (data) {
        const { deleteDeck: deletedDeckId } = data;
        const newDeckList = deckList.filter(deck => {
          return deck.id !== deletedDeckId;
        });
        setDeckList(newDeckList);
        toast.success('Deck deleted.');
      }
    }
  });

  const deleteDeck = deckId => {
    DeleteDeckMutation({
      variables: { deckId: deckId }
    });
  };

  const currentUserDecks = deckList.filter(deck => {
    return deck.owner.id === currentUserId;
  });

  const otherDecks = deckList.filter(deck => {
    return deck.owner.id !== currentUserId;
  });

  if (GetDeckListQueryResponse.loading) {
    return <Spinner />;
  }

  return (
    <main className={classes.DeckList}>
      {deckList.length === 0 ? (
        <h1>No Decks Found.</h1>
      ) : (
        <React.Fragment>
          <h1>Your Decks</h1>

          {currentUserDecks.map(deck => {
            return (
              <DeckListItem deck={deck} key={deck.id} currentUserId={currentUserId} deleteDeckHandler={deleteDeck} />
            );
          })}

          <h1>Other People's Decks</h1>

          {otherDecks.map(deck => {
            return <DeckListItem deck={deck} key={deck.id} currentUserId={currentUserId} />;
          })}
        </React.Fragment>
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
