import React from 'react';

import classes from './ListModeContainer.module.scss';
import ListModeCardItem from './ListModeCardItem';

const ListModeContainer = props => {
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
    <div className={classes.ListModeContainer}>
      <h1>
        Main Deck ({totalMainDeckCount} / {deck.format === 'commander' ? 100 : 60})
      </h1>

      <div className={classes.ListModeCardListContainer}>
        {deck.format === 'commander' && (
          <ListModeCardItem
            cardWithCounts={{ card: deck.commander, mainDeckCount: 1, sideboardCount: 0 }}
            deck={deck}
            type={'commander'}
            currentUserOwnsDeck={currentUserOwnsDeck}
          />
        )}
        {mainDeckList.map(cardWithCounts => {
          return (
            <ListModeCardItem
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
          <div className={classes.ListModeCardListContainer}>
            {sideboardList.map(cardWithCounts => {
              return (
                <ListModeCardItem
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

export default ListModeContainer;
