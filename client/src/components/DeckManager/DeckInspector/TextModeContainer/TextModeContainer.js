import React from 'react';

import TextModeCardItem from './TextModeCardItem';

import classes from './TextModeContainer.module.scss';

const TextModeContainer = props => {
  const { deck, mainDeckList, sideboardList, updateCardListHandler, currentUserOwnsDeck } = props;

  let totalMainDeckCount = deck.format === 'commander' ? 1 : 0;
  let totalSideboardCount = 0;

  mainDeckList.forEach(({ mainDeckCount }) => {
    totalMainDeckCount += mainDeckCount;
  });

  sideboardList.forEach(({ sideboardCount }) => {
    totalSideboardCount += sideboardCount;
  });

  return (
    <div className={classes.TextModeContainer}>
      <h1>
        Main Deck ({totalMainDeckCount} / {deck.format === 'commander' ? 100 : 60})
      </h1>
      <div className={classes.TextModeCardListContainer}>
        {deck.format === 'commander' && (
          <TextModeCardItem
            cardWithCounts={{ card: deck.commander, mainDeckCount: 1, sideboardCount: 0 }}
            deck={deck}
            type={'commander'}
          />
        )}

        {mainDeckList.map(cardWithCounts => {
          return (
            <TextModeCardItem
              key={cardWithCounts.card.scryfall_id}
              cardWithCounts={cardWithCounts}
              deck={deck}
              type={'mainDeck'}
              totalMainDeckCount={totalMainDeckCount}
              totalSideboardCount={totalSideboardCount}
              updateCardListHandler={updateCardListHandler}
              currentUserOwnsDeck={currentUserOwnsDeck}
            />
          );
        })}
      </div>

      {deck.format !== 'commander' && (
        <React.Fragment>
          <h1>Sideboard ({totalSideboardCount} / 15)</h1>
          <div className={classes.TextModeCardListContainer}>
            {sideboardList.map(cardWithCounts => {
              return (
                <TextModeCardItem
                  key={cardWithCounts.card.scryfall_id}
                  cardWithCounts={cardWithCounts}
                  deck={deck}
                  type={'sideboard'}
                  totalMainDeckCount={totalMainDeckCount}
                  totalSideboardCount={totalSideboardCount}
                  updateCardListHandler={updateCardListHandler}
                  currentUserOwnsDeck={currentUserOwnsDeck}
                />
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default TextModeContainer;