import React from 'react';
import { Link } from 'react-router-dom';
import { capitalise } from '../../../utils';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_DECK } from './graphql';
import { GET_DECK_LIST } from '../graphql';

import classes from './DeckListItem.module.scss';

const cardLimitMap = {
  standard: 60,
  commander: 100,
  modern: 60
};

const DeckListItem = props => {
  const [DeleteDeckMutation] = useMutation(DELETE_DECK, {
    variables: {
      deckId: props.deck.id
    },
    refetchQueries: [{ query: GET_DECK_LIST }]
  });

  const { deck } = props;
  let cardCount = 0;

  deck.cardList.map(card => {
    return (cardCount += card.quantity);
  });

  return (
    <div className={classes.DeckListItem}>
      <Link to={`/decks/${deck.id}`}>
        <h2>{deck.name}</h2>
        <p>
          {capitalise(deck.format)}
          {deck.format === 'commander' && ` (${deck.commander.name})`}
        </p>
        <p>
          {cardCount} / {cardLimitMap[deck.format]}
        </p>
      </Link>
      <button type='button' onClick={() => DeleteDeckMutation()}>
        Delete{' '}
      </button>
    </div>
  );
};

export default DeckListItem;
