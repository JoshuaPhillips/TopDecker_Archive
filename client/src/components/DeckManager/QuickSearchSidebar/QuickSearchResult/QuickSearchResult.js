import React from 'react';

import Card from '../../../Card/Card';
import SlideToggle from 'react-slide-toggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const QuickSearchResult = props => {
  const { card, isSelectable, addCardHandler } = props;

  return (
    <SlideToggle collapsed>
      {({ toggle, setCollapsibleElement }) => (
        <div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <p
                onClick={isSelectable ? () => addCardHandler(card) : null}
                style={{ color: isSelectable ? 'black' : 'grey' }}>
                {card.name}
              </p>
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
