import React from 'react';

import Card from '../../../Card/Card';
import SlideToggle from 'react-slide-toggle';

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
            <div>
              <p onClick={toggle} style={{ cursor: 'pointer' }}>
                Eye-con
              </p>
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
