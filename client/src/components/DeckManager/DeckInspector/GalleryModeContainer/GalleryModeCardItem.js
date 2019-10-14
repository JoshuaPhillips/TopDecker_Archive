import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus, faExchangeAlt, faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

import Card from '../../../Card/Card';

import classes from './GalleryModeCardItem.module.scss';

const GalleryModeCardItem = props => {
  const {
    cardWithCounts: { card, mainDeckCount, sideboardCount },
    deck,
    type,
    totalMainDeckCount,
    totalSideboardCount,
    currentUserOwnsDeck,
    updateCardListHandler
  } = props;

  const renderCardControls = () => {
    return (
      <React.Fragment>
        {type === 'commander' && (
          <div className={classes.GalleryModeCardItemControls}>
            <FontAwesomeIcon icon={faCrown} fixedWidth />
          </div>
        )}
        {type !== 'commander' &&
          (deck.format === 'commander' && currentUserOwnsDeck ? (
            <div className={classes.GalleryModeCardItemControls}>
              <button type='button' onClick={() => updateCardListHandler(deck, type, 'remove', card)}>
                <FontAwesomeIcon fixedWidth icon={faTimes} />
              </button>
            </div>
          ) : deck.format !== 'commander' ? (
            <div className={classes.GalleryModeCardItemControls}>
              {deck.format !== 'commander' && (
                <div className={classes.GalleryModeCardQuantityIndicators}>
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
                      (type === 'mainDeck'
                        ? totalMainDeckCount >= (deck.format === 'commander' ? 100 : 60)
                        : totalSideboardCount >= 15)
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
            </div>
          ) : null)}
      </React.Fragment>
    );
  };

  return (
    <div className={classes.GalleryModeCardItem}>
      <React.Fragment>
        <Card card={card} />
        {renderCardControls()}
      </React.Fragment>
    </div>
  );
};

export default GalleryModeCardItem;
