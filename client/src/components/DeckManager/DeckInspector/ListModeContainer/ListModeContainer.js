import React from 'react';
import FlipMove from 'react-flip-move';

import classes from './ListModeContainer.module.scss';

import { capitalise } from '../../../../utils/capitalise';

const ListModeContainer = props => {
  const { format, commander, mainDeckList, sideboardList } = props;

  return (
    <div className={classes.ListModeContainer}>
      <h1>Main Deck</h1>
      {format === 'commander' && (
        <div className={classes.ListModeCommanderWrapper}>
          <div className={classes.ListModeCommanderDetails}>
            <p>{commander.name}</p>
            <p>{commander.type_line}</p>
            <p>{commander.mana_cost === null ? '-' : commander.mana_cost}</p>
            <p>{capitalise(commander.rarity)}</p>
          </div>
          <div />
        </div>
      )}

      <div>
        <FlipMove typeName={null}>
          {mainDeckList.map(({ card, mainDeckCount }) => {
            return (
              <div key={card.scryfall_id} className={classes.ListModeCardWrapper}>
                <div className={classes.ListModeCardDetails}>
                  <p>{card.name}</p>
                  <p>{card.type_line}</p>
                  <p>{card.mana_cost === null ? '-' : card.mana_cost}</p>
                  <p>{capitalise(card.rarity)}</p>
                </div>
                {format === 'commander' ? (
                  <div className={classes.ListModeQuantityModifiers}>
                    <p>Remove</p>
                  </div>
                ) : (
                  <div className={classes.ListModeCardQuantityModifiers}>
                    <p>x {mainDeckCount}</p>
                    <p>Add</p>
                    <p>Remove</p>
                    <p>Transfer</p>
                  </div>
                )}
              </div>
            );
          })}
        </FlipMove>
      </div>
      <div>
        <h1>Sideboard</h1>
        <FlipMove typeName={null}>
          {sideboardList.map(({ card, sideboardCount }) => {
            return (
              <div key={card.scryfall_id} className={classes.ListModeCardWrapper}>
                <div className={classes.ListModeCardDetails}>
                  <p>{card.name}</p>
                  <p>{card.type_line}</p>
                  <p>{card.mana_cost}</p>
                  <p>{capitalise(card.rarity)}</p>
                </div>

                <div className={classes.ListModeCardQuantityModifiers}>
                  <p>x {sideboardCount}</p>
                  <p>Add</p>
                  <p>Remove</p>
                  <p>Transfer</p>
                </div>
              </div>
            );
          })}
        </FlipMove>
      </div>
    </div>
  );
};

export default ListModeContainer;
