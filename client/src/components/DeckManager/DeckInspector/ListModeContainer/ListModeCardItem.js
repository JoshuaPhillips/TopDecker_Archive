import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faExchangeAlt, faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

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

  const renderManaCost = () => {
    if (card.mana_cost === null) {
      return card.card_faces.length !== 0 ? convertTextToSymbols(card.card_faces[0].mana_cost) : <p>-</p>;
    } else {
      return convertTextToSymbols(card.mana_cost);
    }
  };

  const renderCardControls = () => {
    return type === 'commander' ? (
      <div className={classes.ListModeCardItemControls}>
        <FontAwesomeIcon icon={faCrown} fixedWidth />
      </div>
    ) : (
      <React.Fragment>
        <div className={classes.ListModeCardItemControls}>
          {deck.format === 'commander' && currentUserOwnsDeck ? (
            <button type='button' onClick={() => updateCardListHandler(deck, type, 'remove', card)}>
              <FontAwesomeIcon fixedWidth icon={faTimes} />
            </button>
          ) : (
            <React.Fragment>
              {deck.format !== 'commander' && (
                <div className={classes.ListModeCardQuantityIndicators}>
                  {[...Array(type === 'mainDeck' ? mainDeckCount : sideboardCount)].map(() => {
                    return <FontAwesomeIcon icon={faStar} fixedWidth />;
                  })}
                  {[...Array(type === 'mainDeck' ? 4 - mainDeckCount : 4 - sideboardCount)].map(() => {
                    return <FontAwesomeIcon icon={faRegularStar} fixedWidth />;
                  })}
                </div>
              )}
              {currentUserOwnsDeck && (
                <React.Fragment>
                  <button
                    type='button'
                    disabled={
                      mainDeckCount + sideboardCount === 4 ||
                      (type === 'mainDeck' ? totalMainDeckCount >= 60 : totalSideboardCount >= 15)
                    }
                    onClick={() => updateCardListHandler(deck, type, 'add', card)}>
                    <FontAwesomeIcon fixedWidth icon={faPlus} />
                  </button>
                  <button
                    type='button'
                    disabled={type === 'mainDeck' ? mainDeckCount === 0 : sideboardCount === 0}
                    onClick={() => updateCardListHandler(deck, type, 'remove', card)}>
                    <FontAwesomeIcon fixedWidth icon={faMinus} />
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      updateCardListHandler(
                        deck,
                        type === 'mainDeck' ? 'sideboard' : 'mainDeck',
                        type === 'mainDeck' ? 'transferToSideboard' : 'transferToMainDeck',
                        card
                      )
                    }>
                    <FontAwesomeIcon fixedWidth icon={faExchangeAlt} />
                  </button>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div key={card.scryfall_id} className={classes.ListModeCardItem}>
      <div className={classes.ListModeCardDetails}>
        <p>{card.name}</p>
        <p>{card.type_line}</p>

        {renderManaCost()}
        <p>{capitalise(card.rarity)}</p>
      </div>
      {renderCardControls()}
    </div>
  );
};

export default ListModeCardItem;
