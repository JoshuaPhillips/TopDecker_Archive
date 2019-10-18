import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faPlus, faTimes, faMinus, faExchangeAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

import { StyledCardItemControls } from './styles';

const CardItemControls = props => {
  const {
    type,
    deck,
    currentUserOwnsDeck,
    updateCardListHandler,
    card,
    mainDeckCount,
    sideboardCount,
    totalMainDeckCount,
    totalSideboardCount
  } = props;

  const commanderControls = (
    <div>
      <FontAwesomeIcon icon={faCrown} fixedWidth />
    </div>
  );
  const deleteControls = (
    <div>
      <button type='button' onClick={() => updateCardListHandler(deck, type, 'remove', card)}>
        <FontAwesomeIcon icon={faTimes} fixedWidth />
      </button>
    </div>
  );
  const quantityIndicators = (
    <div>
      {[...Array(type === 'mainDeck' ? mainDeckCount : sideboardCount)].map((_, index) => {
        return <FontAwesomeIcon icon={faStar} fixedWidth key={`${card.scryfall_id}__faStar__${index}`} />;
      })}
      {[...Array(type === 'mainDeck' ? 4 - mainDeckCount : 4 - sideboardCount)].map((_, index) => {
        return <FontAwesomeIcon icon={faRegularStar} fixedWidth key={`${card.scryfall_id}__faRegularStar__${index}`} />;
      })}
    </div>
  );

  const quantityControls = (
    <div>
      <button
        type='button'
        disabled={
          mainDeckCount + sideboardCount === 4 ||
          (type === 'mainDeck' ? totalMainDeckCount >= 60 : totalSideboardCount >= 15)
        }
        onClick={() => updateCardListHandler(deck, type, 'add', card)}>
        <FontAwesomeIcon icon={faPlus} fixedWidth />
      </button>
      <button
        type='button'
        disabled={type === 'mainDeck' ? mainDeckCount === 0 : sideboardCount === 0}
        onClick={() => updateCardListHandler(deck, type, 'remove', card)}>
        <FontAwesomeIcon icon={faMinus} fixedWidth />
      </button>
      <button
        type='button'
        disabled={type === 'mainDeck' ? totalSideboardCount >= 15 : totalMainDeckCount >= 60}
        onClick={() =>
          updateCardListHandler(
            deck,
            type === 'mainDeck' ? 'sideboard' : 'mainDeck',
            type === 'mainDeck' ? 'transferToSideboard' : 'transferToMainDeck',
            card
          )
        }>
        <FontAwesomeIcon icon={faExchangeAlt} fixedWidth />
      </button>
    </div>
  );

  if (!currentUserOwnsDeck) {
    return deck.format === 'commander' ? null : <StyledCardItemControls>{quantityIndicators}</StyledCardItemControls>;
  }

  return deck.format === 'commander' ? (
    type === 'commander' ? (
      <StyledCardItemControls>{commanderControls}</StyledCardItemControls>
    ) : (
      <StyledCardItemControls>{deleteControls}</StyledCardItemControls>
    )
  ) : (
    <StyledCardItemControls>
      {quantityIndicators}
      {quantityControls}
    </StyledCardItemControls>
  );
};

export default CardItemControls;
