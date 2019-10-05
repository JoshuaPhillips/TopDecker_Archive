import React from 'react';

import convertTextToSymbols from '../../../../utils/convertTextToSymbols';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';

import classes from './TextModeContainer.module.scss';

const TextModeContainer = props => {
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
    <div className={classes.TextModeContainer}>
      <div>
        <h1>Main Deck</h1>
        <div className={classes.TextModeCardListContainer}>
          {format === 'commander' && (
            <div className={classes.TextModeCardItemContainer}>
              <div className={classes.TextModeCardItemHeader}>
                <p>{commander.name}</p>
                {convertTextToSymbols(commander.mana_cost)}
              </div>
              <div className={classes.TextModeCardItemContent}>
                <p>{commander.type_line}</p>
                {convertTextToSymbols(commander.oracle_text)}
              </div>
              <div className={classes.TextModeCardItemControls}>
                <p onClick={() => props.updateCardListHandler(props.deck, 'mainDeck', 'remove', commander)}>
                  <FontAwesomeIcon fixedWidth icon={faTimes} />
                </p>
              </div>
            </div>
          )}

          {/* MAIN DECK */}

          {mainDeckList.map(({ card, mainDeckCount, sideboardCount }) => {
            return (
              <div className={classes.TextModeCardItemContainer}>
                <div className={classes.TextModeCardItemHeader}>
                  <p>{card.name}</p>
                  {convertTextToSymbols(card.mana_cost)}
                </div>
                <div className={classes.TextModeCardItemContent}>
                  <p>{card.type_line}</p>
                  {convertTextToSymbols(card.oracle_text)}
                </div>
                <div className={classes.TextModeCardItemControls}>
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
                        onClick={() =>
                          props.updateCardListHandler(props.deck, 'sideboard', 'transferToSideboard', card)
                        }>
                        <FontAwesomeIcon fixedWidth icon={faSync} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SIDEBOARD */}

      {format !== 'commander' && (
        <div>
          <h1>Sideboard</h1>
          <div className={classes.TextModeCardListContainer}>
            {sideboardList.map(({ card, mainDeckCount, sideboardCount }) => {
              return (
                <div className={classes.TextModeCardItemContainer}>
                  <div className={classes.TextModeCardItemHeader}>
                    <p>{card.name}</p>
                    {convertTextToSymbols(card.mana_cost)}
                  </div>
                  <div className={classes.TextModeCardItemContent}>
                    <p>{card.type_line}</p>
                    {convertTextToSymbols(card.oracle_text)}
                  </div>
                  <div className={classes.TextModeCardItemControls}>
                    <p>x {sideboardCount}</p>
                    <button
                      type='button'
                      disabled={mainDeckCount + sideboardCount === 4 || totalSideboardCount >= 60}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TextModeContainer;
