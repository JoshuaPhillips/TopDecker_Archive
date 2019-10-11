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

  const renderCardControls = () => {
    return type === 'commander' ? (
      <div className={classes.TextModeCardItemControls}>
        <FontAwesomeIcon icon={faCrown} fixedWidth />
      </div>
    ) : (
      <React.Fragment>
        <div className={classes.TextModeCardItemControls}>
          {deck.format === 'commander' && currentUserOwnsDeck ? (
            <button type='button' onClick={() => updateCardListHandler(deck, type, 'remove', card)}>
              <FontAwesomeIcon fixedWidth icon={faTimes} />
            </button>
          ) : (
            <React.Fragment>
              {deck.format !== 'commander' && <p>x {type === 'mainDeck' ? mainDeckCount : sideboardCount}</p>}
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

  return (
    <div className={classes.TextModeCardItem}>
      {card.card_faces.length === 0 ? (
        <React.Fragment>
          <div className={classes.TextModeCardItemHeader}>
            <p>{card.name}</p>
            {card.mana_cost && card.mana_cost.length !== 0 && convertTextToSymbols(card.mana_cost)}
          </div>
          <div className={classes.TextModeCardItemContent}>
            <div>
              <p>{card.type_line}</p>
            </div>
            {card.oracle_text !== null && (
              <div className={classes.TextModeCardItemOracleText}>{convertTextToSymbols(card.oracle_text)}</div>
            )}
            {card.power && card.toughness ? (
              <div>
                <p>
                  {card.power} / {card.toughness}
                </p>
                {card.loyalty && <p>{card.loyalty}</p>}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      ) : (
        card.card_faces.map(card_face => {
          console.log(card_face);
          return (
            <React.Fragment key={`${card.scryfall_id}__${card_face.name}`}>
              <div className={classes.TextModeCardItemHeader}>
                <p>{card_face.name}</p>
                {card_face.mana_cost.length !== 0 && convertTextToSymbols(card_face.mana_cost)}
              </div>
              <div className={classes.TextModeCardItemContent}>
                <div>
                  <p>{card_face.type_line}</p>
                </div>
                {card_face.oracle_text !== null && (
                  <div className={classes.TextModeCardItemOracleText}>
                    {convertTextToSymbols(card_face.oracle_text)}
                  </div>
                )}
                {card_face.power && card_face.toughness && (
                  <div>
                    <p>
                      {card_face.power} / {card_face.toughness}
                    </p>
                  </div>
                )}
                {card_face.loyalty && (
                  <div>
                    <p>Starting Loyalty: {card_face.loyalty}</p>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })
      )}
      {renderCardControls()}
    </div>
  );
};

export default TextModeCardItem;
