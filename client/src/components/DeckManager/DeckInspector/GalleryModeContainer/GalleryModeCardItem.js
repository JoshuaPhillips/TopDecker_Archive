import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus, faSync, faCrown } from '@fortawesome/free-solid-svg-icons';

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

  const renderCommanderItem = () => {
    return (
      <React.Fragment>
        <Card card={card} />
        <div className={classes.GalleryModeCardItemControls}>
          <FontAwesomeIcon icon={faCrown} fixedWidth />
        </div>
      </React.Fragment>
    );
  };

  const renderMainDeckItem = () => {
    return (
      <React.Fragment>
        <Card card={card} />

        {deck.format === 'commander' ? (
          <div className={classes.GalleryModeCardItemControls}>
            <button type='button' onClick={() => updateCardListHandler(deck, 'mainDeck', 'remove', card)}>
              <FontAwesomeIcon fixedWidth icon={faTimes} />
            </button>
          </div>
        ) : (
          <div className={classes.GalleryModeCardItemControls}>
            {deck.format !== 'commander' && <p>x {mainDeckCount}</p>}
            {currentUserOwnsDeck && (
              <React.Fragment>
                <button
                  type='button'
                  disabled={
                    mainDeckCount + sideboardCount === 4 ||
                    totalMainDeckCount >= (deck.format === 'commander' ? 100 : 60)
                  }
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
        <Card card={card} />
        <div>
          {deck.format === 'commander' ? (
            <div className={classes.GalleryModeCardItemControls}>
              <p onClick={() => updateCardListHandler(deck, 'sideboard', 'remove', card)}>
                <FontAwesomeIcon fixedWidth icon={faTimes} />
              </p>
            </div>
          ) : (
            <div className={classes.GalleryModeCardItemControls}>
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
                    disabled={mainDeckCount === 0}
                    onClick={() => updateCardListHandler(deck, 'sideboard', 'remove', card)}>
                    <FontAwesomeIcon fixedWidth icon={faMinus} />
                  </button>
                  <button
                    type='button'
                    onClick={() => updateCardListHandler(deck, 'mainDeck', 'transferToMainDeck', card)}>
                    <FontAwesomeIcon fixedWidth icon={faSync} />
                  </button>
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.GalleryModeCardItem}>
      {type === 'commander'
        ? renderCommanderItem()
        : type === 'mainDeck'
        ? renderMainDeckItem()
        : renderSideboardItem()}
    </div>
  );
};

export default GalleryModeCardItem;
