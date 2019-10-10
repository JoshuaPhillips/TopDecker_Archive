import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus, faSync, faCrown } from '@fortawesome/free-solid-svg-icons';

import convertTextToSymbols from '../../../../utils/convertTextToSymbols';
import classes from './TextModeCardItem.module.scss';
import convertTextToSymbol from '../../../../utils/convertTextToSymbols';

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

  const renderManaCost = () => {
    if (card.mana_cost === null) {
      return card.card_faces ? convertTextToSymbols(card.card_faces[0].mana_cost) : <p>-</p>;
    } else {
      return convertTextToSymbols(card.mana_cost);
    }
  };

  const renderOracleText = () => {
    // Normal layout cards with no oracle text.
    if (card.oracle_text === null && card.card_faces.length === 0) {
      return null;
    }

    // Non-normal layout cards.
    if (card.oracle_text === null) {
      let oracleStringArray = [];
      card.card_faces.forEach(card_face => {
        oracleStringArray.push(card_face.oracle_text);
      });
      return convertTextToSymbols(oracleStringArray.join('\n\n\n'));
    } else {
      // Normal layout cards with oracle text.
      return convertTextToSymbol(card.oracle_text);
    }
  };

  const renderCommanderItem = () => {
    return (
      <React.Fragment>
        <div className={classes.TextModeCardItemHeader}>
          <p>{card.name}</p>
          {renderManaCost()}
        </div>
        <div className={classes.TextModeCardItemContent}>
          <p>{card.type_line}</p>
          {renderOracleText()}
        </div>
        <div className={classes.TextModeCardItemControls}>
          <FontAwesomeIcon icon={faCrown} fixedWidth />
        </div>
      </React.Fragment>
    );
  };

  const renderMainDeckItem = () => {
    return (
      <React.Fragment>
        <div className={classes.TextModeCardItemHeader}>
          <p>{card.name}</p>
          {renderManaCost()}
        </div>
        <div className={classes.TextModeCardItemContent}>
          <p>{card.type_line}</p>
          {renderOracleText()}
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
  };

  const renderSideboardItem = () => {
    return (
      <React.Fragment>
        <div className={classes.TextModeCardItemHeader}>
          <p>{card.name}</p>
          {renderManaCost()}
        </div>
        <div className={classes.TextModeCardItemContent}>
          <p>{card.type_line}</p>
          {renderOracleText()}
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
