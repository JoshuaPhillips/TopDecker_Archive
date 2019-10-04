import React from 'react';
import FlipMove from 'react-flip-move';

import classes from './ListModeContainer.module.scss';

import { capitalise } from '../../../../utils/capitalise';
import convertManaCost from '../../../../utils/convertTextToSymbols';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faPlus, faMinus, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';

const ListModeContainer = props => {
  const { format, commander, mainDeckList, sideboardList } = props;

  let totalMainDeckCount = format === 'commander' ? 1 : 0;
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
        Main Deck ({totalMainDeckCount} / {format === 'commander' ? 100 : 60})
      </h1>
      {format === 'commander' && (
        <div className={classes.ListModeCommanderWrapper}>
          <div className={classes.ListModeCommanderDetails}>
            <p>{commander.name}</p>
            <p>{commander.type_line}</p>
            <p>{commander.mana_cost === null ? '-' : convertManaCost(commander.mana_cost)}</p>
            <p>{capitalise(commander.rarity)}</p>
          </div>
          <div className={classes.ListModeCardQuantityModifiers}>
            <p>
              <FontAwesomeIcon fixedWidth icon={faCrown} />
            </p>
          </div>
        </div>
      )}

      <div>
        <FlipMove typeName={null} enterAnimation={'none'} leaveAnimation={'none'}>
          {mainDeckList.map(({ card, mainDeckCount, sideboardCount }) => {
            return (
              <div key={card.scryfall_id} className={classes.ListModeCardWrapper}>
                <div className={classes.ListModeCardDetails}>
                  <p>{card.name}</p>
                  <p>{card.type_line}</p>
                  <p>{card.mana_cost === null ? '-' : convertManaCost(card.mana_cost)}</p>
                  <p>{capitalise(card.rarity)}</p>
                </div>
                {format === 'commander' ? (
                  <div className={classes.ListModeCardQuantityModifiers}>
                    <p onClick={() => props.updateCardListHandler(props.deck, 'mainDeck', 'remove', card)}>
                      <FontAwesomeIcon fixedWidth icon={faTimes} />
                    </p>
                  </div>
                ) : (
                  <div className={classes.ListModeCardQuantityModifiers}>
                    <p>x {mainDeckCount}</p>
                    <button
                      type='button'
                      disabled={mainDeckCount + sideboardCount === 4 || totalMainDeckCount >= 60}
                      onClick={() => props.updateCardListHandler(props.deck, 'mainDeck', 'add', card)}>
                      <FontAwesomeIcon fixedWidth icon={faPlus} />
                    </button>
                    <button
                      type='button'
                      disabled={mainDeckCount === 0}
                      onClick={() => props.updateCardListHandler(props.deck, 'mainDeck', 'remove', card)}>
                      <FontAwesomeIcon fixedWidth icon={faMinus} />
                    </button>
                    <button
                      type='button'
                      onClick={() => props.updateCardListHandler(props.deck, 'sideboard', 'transferToSideboard', card)}>
                      <FontAwesomeIcon fixedWidth icon={faSync} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </FlipMove>
      </div>
      {format !== 'commander' && (
        <div>
          <h1>Sideboard ({totalSideboardCount} / 15)</h1>
          <FlipMove typeName={null} enterAnimation={'none'} leaveAnimation={'none'}>
            {sideboardList.map(({ card, mainDeckCount, sideboardCount }) => {
              return (
                <div key={card.scryfall_id} className={classes.ListModeCardWrapper}>
                  <div className={classes.ListModeCardDetails}>
                    <p>{card.name}</p>
                    <p>{card.type_line}</p>
                    <p>{card.mana_cost === null ? '-' : convertManaCost(card.mana_cost)}</p>
                    <p>{capitalise(card.rarity)}</p>
                  </div>

                  <div className={classes.ListModeCardQuantityModifiers}>
                    <p>x {sideboardCount}</p>
                    <button
                      type='button'
                      disabled={mainDeckCount + sideboardCount === 4 || totalSideboardCount >= 15}
                      onClick={() => props.updateCardListHandler(props.deck, 'sideboard', 'add', card)}>
                      <FontAwesomeIcon fixedWidth icon={faPlus} />
                    </button>
                    <button
                      type='button'
                      disabled={sideboardCount === 0}
                      onClick={() => props.updateCardListHandler(props.deck, 'sideboard', 'remove', card)}>
                      <FontAwesomeIcon fixedWidth icon={faMinus} />
                    </button>
                    <button
                      type='button'
                      onClick={() => props.updateCardListHandler(props.deck, 'mainDeck', 'transferToMainDeck', card)}>
                      <FontAwesomeIcon fixedWidth icon={faSync} />
                    </button>
                  </div>
                </div>
              );
            })}
          </FlipMove>
        </div>
      )}
    </div>
  );
};

export default ListModeContainer;
