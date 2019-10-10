import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faSync, faCrown } from '@fortawesome/free-solid-svg-icons';

import classes from './TextModeCardItem.module.scss';
import convertTextToSymbols from '../../../../utils/convertTextToSymbols';

const TextModeCardItem = props => {
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
    if (card.card_faces.length === 0) {
      return (
        <React.Fragment>
          <div className={classes.TextModeCardItemHeader}>
            <p>{card.name}</p>
            {convertTextToSymbols(card.mana_cost)}
          </div>
          <div className={classes.TextModeCardItemContent}>
            <p>{card.type_line}</p>
            {convertTextToSymbols(card.oracle_text)}
          </div>
          <div className={classes.TextModeCardItemControls}>
            <FontAwesomeIcon icon={faCrown} fixedWidth />
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {card.card_faces.map(card_face => {
          return (
            <React.Fragment>
              <div className={classes.TextModeCardItemHeader}>
                <p>{card_face.name}</p>
                {convertTextToSymbols(card_face.mana_cost)}
              </div>
              <div className={classes.TextModeCardItemContent}>
                <p>{card_face.type_line}</p>
                {convertTextToSymbols(card_face.oracle_text)}
              </div>
            </React.Fragment>
          );
        })}
        <div className={classes.TextModeCardItemControls}>
          <FontAwesomeIcon icon={faCrown} fixedWidth />
        </div>
      </React.Fragment>
    );
  };

  const renderMainDeckItem = () => {
    if (card.card_faces.length === 0) {
      return (
        <React.Fragment>
          <div className={classes.TextModeCardItemHeader}>
            <p>{card.name}</p>
            {convertTextToSymbols(card.mana_cost)}
          </div>
          <div className={classes.TextModeCardItemContent}>
            <p>{card.type_line}</p>
            {convertTextToSymbols(card.oracle_text)}
          </div>
          <div className={classes.TextModeCardItemControls}>
            {deck.format === 'commander' && currentUserOwnsDeck ? (
              <button type='button' onClick={() => updateCardListHandler(deck, 'mainDeck', 'remove', card)}>
                <FontAwesomeIcon fixedWidth icon={faTimes} />
              </button>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {card.card_faces.map(card_face => {
          return (
            <React.Fragment>
              <div className={classes.TextModeCardItemHeader}>
                <p>{card_face.name}</p>
                {convertTextToSymbols(card_face.mana_cost)}
              </div>
              <div className={classes.TextModeCardItemContent}>
                <p>{card_face.type_line}</p>
                {convertTextToSymbols(card_face.oracle_text)}
              </div>
            </React.Fragment>
          );
        })}
        <div className={classes.TextModeCardItemControls}>
          {deck.format === 'commander' && currentUserOwnsDeck ? (
            <button type='button' onClick={() => updateCardListHandler(deck, 'mainDeck', 'remove', card)}>
              <FontAwesomeIcon fixedWidth icon={faTimes} />
            </button>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  };

  const renderSideboardItem = () => {
    if (card.card_faces.length === 0) {
      return (
        <React.Fragment>
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
            {currentUserOwnsDeck && (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {card.card_faces.map(card_face => {
          return (
            <React.Fragment>
              <div className={classes.TextModeCardItemHeader}>
                <p>{card_face.name}</p>
                {convertTextToSymbols(card_face.mana_cost)}
              </div>
              <div className={classes.TextModeCardItemContent}>
                <p>{card_face.type_line}</p>
                {convertTextToSymbols(card_face.oracle_text)}
              </div>
            </React.Fragment>
          );
        })}
        <div className={classes.TextModeCardItemControls}>
          <p>x {sideboardCount}</p>
          {currentUserOwnsDeck && (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.TextModeCardItem}>
      {type === 'commander'
        ? renderCommanderItem()
        : type === 'mainDeck'
        ? renderMainDeckItem()
        : renderSideboardItem()}
    </div>
  );
};

export default TextModeCardItem;
