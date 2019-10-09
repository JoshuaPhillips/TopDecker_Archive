import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faSync, faCrown } from '@fortawesome/free-solid-svg-icons';

import convertTextToSymbols from '../../../../utils/convertTextToSymbols';
import { capitalise } from '../../../../utils/capitalise';

import classes from './ListModeCardItem.module.scss';

const ListModeCardItem = props => {
  const {
    cardWithCounts: { card, mainDeckCount, sideboardCount },
    deck,
    type,
    totalMainDeckCount,
    totalSideboardCount,
    updateCardListHandler,
    currentUserOwnsDeck
  } = props;

  const renderCommanderItem = () => {
    return (
      <React.Fragment>
        <div className={classes.ListModeCardDetails}>
          <p>{card.name}</p>
          <p>{card.type_line}</p>
          {card.mana_cost === null ? '-' : convertTextToSymbols(card.mana_cost)}
          <p>{capitalise(card.rarity)}</p>
        </div>

        <div className={classes.ListModeCardItemControls}>
          <button type='button'>
            <FontAwesomeIcon fixedWidth icon={faCrown} />
          </button>
        </div>
      </React.Fragment>
    );
  };

  const renderMainDeckItem = () => {
    return (
      <React.Fragment>
        <div className={classes.ListModeCardDetails}>
          <p>{card.name}</p>
          <p>{card.type_line}</p>
          {card.mana_cost === null ? '-' : convertTextToSymbols(card.mana_cost)}
          <p>{capitalise(card.rarity)}</p>
        </div>
        {deck.format === 'commander' && currentUserOwnsDeck ? (
          <div className={classes.ListModeCardItemControls}>
            <button type='button' onClick={() => updateCardListHandler(deck, 'mainDeck', 'remove', card)}>
              <FontAwesomeIcon fixedWidth icon={faTimes} />
            </button>
          </div>
        ) : (
          <div className={classes.ListModeCardItemControls}>
            {deck.format !== 'commander' && <p>x {mainDeckCount}</p>}
            {currentUserOwnsDeck && (
              <React.Fragment>
                <button
                  type='button'
                  disabled={mainDeckCount + sideboardCount === 4 || totalMainDeckCount >= 60}
                  onClick={() => updateCardListHandler(deck, 'mainDeck', 'add', card)}>
                  <FontAwesomeIcon fixedWidth icon={faPlus} />
                </button>
                <button
                  type='button'
                  disabled={mainDeckCount === 0}
                  onClick={() => updateCardListHandler(deck, 'mainDeck', 'remove', card)}>
                  <FontAwesomeIcon fixedWidth icon={faMinus} />
                </button>
                <button
                  type='button'
                  onClick={() => updateCardListHandler(deck, 'sideboard', 'transferToSideboard', card)}>
                  <FontAwesomeIcon fixedWidth icon={faSync} />
                </button>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  };

  const renderSideboardItem = () => {
    return (
      <React.Fragment>
        <div className={classes.ListModeCardDetails}>
          <p>{card.name}</p>
          <p>{card.type_line}</p>
          {card.mana_cost === null ? '-' : convertTextToSymbols(card.mana_cost)}
          <p>{capitalise(card.rarity)}</p>
        </div>
        <div className={classes.ListModeCardItemControls}>
          <p>x {sideboardCount}</p>
          {currentUserOwnsDeck && (
            <React.Fragment>
              <button
                type='button'
                disabled={mainDeckCount + sideboardCount === 4 || totalSideboardCount >= 60}
                onClick={() => updateCardListHandler(deck, 'sideboard', 'add', card)}>
                <FontAwesomeIcon fixedWidth icon={faPlus} />
              </button>
              <button
                type='button'
                disabled={sideboardCount === 0}
                onClick={() => updateCardListHandler(deck, 'sideboard', 'remove', card)}>
                <FontAwesomeIcon fixedWidth icon={faMinus} />
              </button>
              <button type='button' onClick={() => updateCardListHandler(deck, 'mainDeck', 'transferToMainDeck', card)}>
                <FontAwesomeIcon fixedWidth icon={faSync} />
              </button>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  };
  return (
    <div key={card.scryfall_id} className={classes.ListModeCardItem}>
      {type === 'commander'
        ? renderCommanderItem()
        : type === 'mainDeck'
        ? renderMainDeckItem()
        : renderSideboardItem()}
    </div>
  );
};

export default ListModeCardItem;
