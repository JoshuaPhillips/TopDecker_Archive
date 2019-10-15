import React from 'react';
import { Link } from 'react-router-dom';
import { capitalise } from '../../../utils/capitalise';

import { StyledDeckListItem } from './styles';
import { DangerButton } from '../../../shared/Button';

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
    <Link to={`/decks/${id}`}>
      <StyledDeckListItem>
        <div className='DeckListItemMeta'>
          <h2>{name}</h2>
          <p>
            {capitalise(format)}
            {format === 'commander' && ` (${commander.name})`}
          </p>
          <p>{owner.username}</p>
        </div>
        <div className='DeckListItemCardCount'>
          <p>
            {mainCount} /{' '}
            {mainCount > cardLimitMap[format] && format !== 'commander'
              ? cardLimitMap[format] + 15
              : cardLimitMap[format]}
          </p>
        </div>
        {owner.id === currentUserId && (
          <div className='DeckListItemDeleteContainer'>
            <DangerButton
              type='button'
              onClick={e => {
                e.preventDefault();
                deleteDeckHandler(id);
              }}>
              Delete
            </DangerButton>
          </div>
        )}
      </StyledDeckListItem>
    </Link>
  );
};

export default DeckListItem;
