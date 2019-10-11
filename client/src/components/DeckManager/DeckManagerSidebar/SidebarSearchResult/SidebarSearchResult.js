import React from 'react';

import Card from '../../../Card/Card';
import SlideToggle from 'react-slide-toggle';

import { validateAddCard } from '../../../../utils/validateAddCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const QuickSearchResult = props => {
  const { deck, card, list, addCardHandler } = props;

  return (
    <SlideToggle collapsed>
      {({ toggle, setCollapsibleElement }) => (
        <div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <button
                onClick={() => addCardHandler(deck, list, 'add', card)}
                disabled={!validateAddCard(deck, card, list)}>
                {card.name}
              </button>
            </div>
            <div onClick={toggle}>
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
          <div ref={setCollapsibleElement}>
            <Card card={card}></Card>
          </div>
        </div>
      )}
    </SlideToggle>
  );
};

export default QuickSearchResult;
