import React from 'react';
import { Link } from 'react-router-dom';
import { capitalise } from '../../../utils/capitalise';

import classes from './DeckListItem.module.scss';

const cardLimitMap = {
  standard: 60,
  commander: 100,
  modern: 60
};

const DeckListItem = props => {
  const {
    deck: { id, cardList, name, format, commander, owner },
    currentUserId,
    deleteDeckHandler
  } = props;

  let mainCount = 0;

  cardList.map(card => {
    return (mainCount += card.mainDeckCount + card.sideboardCount);
  });

  if (format === 'commander') {
    mainCount += 1;
  }

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
          {mainCount} /{' '}
          {mainCount > cardLimitMap[format] && format !== 'commander'
            ? cardLimitMap[format] + 15
            : cardLimitMap[format]}
        </p>
      </Link>
      {owner.id === currentUserId && (
        <button type='button' onClick={() => deleteDeckHandler(id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default DeckListItem;
