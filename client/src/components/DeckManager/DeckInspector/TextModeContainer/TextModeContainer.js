import React from 'react';
import TextModeCardItemContainer from './TextModeCardItemContainer';

import classes from './TextModeContainer.module.scss';

const TextModeContainer = props => {
  const { format, commander, mainDeckList, sideboardList } = props;

  return (
    <div className={classes.TextModeContainer}>
      <div>
        <h1>Main Deck</h1>
        <div className={classes.TextModeCardListContainer}>
          <TextModeCardItemContainer card={commander} />
          {mainDeckList.map(({ card }) => {
            return <TextModeCardItemContainer key={card.scryfall_id} card={card} />;
          })}
        </div>
      </div>
      {format !== 'commander' && (
        <div>
          <h1>Sideboard</h1>
          <div className={classes.TextModeCardListContainer}>
            {sideboardList.map(({ card }) => {
              return <TextModeCardItemContainer key={card.scryfall_id} card={card} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextModeContainer;
