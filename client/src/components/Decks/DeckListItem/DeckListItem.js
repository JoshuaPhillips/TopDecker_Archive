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
  const {
    deck: { id, cardList, name, format, commander, owner }
  } = props;

  const [DeleteDeckMutation] = useMutation(DELETE_DECK, {
    variables: {
      deckId: id
    },
    refetchQueries: [{ query: GET_DECK_LIST }]
  });

  let mainCount = 0;

  cardList.map(card => {
    return (mainCount += card.mainDeckCount + card.sideboardCount);
  });

  return (
    <div className={classes.DeckListItem}>
      <Link to={`/decks/${id}`}>
        <h2>{name}</h2>
        <p>
          {capitalise(format)}
          {format === 'commander' && ` (${commander.name})`}
        </p>
        <p>{owner.username}</p>
        <p>
          {mainCount} / {mainCount > cardLimitMap[format] ? cardLimitMap[format] + 15 : cardLimitMap[format]}
        </p>
      </Link>
      <button type='button' onClick={() => DeleteDeckMutation()}>
        Delete{' '}
      </button>
    </div>
  );
};

export default DeckListItem;
