import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faPlus, faTimes, faMinus, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

import { StyledCardItemControls } from "./styles";
import { calculateCardAllowance } from "../../../../utils/calculateCardAllowance";

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
      <button type='button' onClick={() => updateCardListHandler(deck, type, "remove", card)}>
        <FontAwesomeIcon icon={faTimes} fixedWidth />
      </button>
    </div>
  );

  const quantityIndicator = (
    <div>
      <p>x {type === "mainDeck" ? mainDeckCount : sideboardCount}</p>
    </div>
  );

  const quantityControls = (
    <div>
      <button
        type='button'
        disabled={
          mainDeckCount + sideboardCount === calculateCardAllowance(card, deck.format) ||
          (type === "sidebaord" && totalSideboardCount >= 15)
        }
        onClick={() => updateCardListHandler(deck, type, "add", card)}>
        <FontAwesomeIcon icon={faPlus} fixedWidth />
      </button>
      <button
        type='button'
        disabled={type === "mainDeck" ? mainDeckCount === 0 : sideboardCount === 0}
        onClick={() => updateCardListHandler(deck, type, "remove", card)}>
        <FontAwesomeIcon icon={faMinus} fixedWidth />
      </button>
      <button
        type='button'
        disabled={type === "mainDeck" ? totalSideboardCount >= 15 : totalMainDeckCount >= 60}
        onClick={() =>
          updateCardListHandler(
            deck,
            type === "mainDeck" ? "sideboard" : "mainDeck",
            type === "mainDeck" ? "transferToSideboard" : "transferToMainDeck",
            card
          )
        }>
        <FontAwesomeIcon icon={faExchangeAlt} fixedWidth />
      </button>
    </div>
  );

  if (!currentUserOwnsDeck) {
    return deck.format === "commander" ? null : <StyledCardItemControls>{quantityIndicator}</StyledCardItemControls>;
  }

  return deck.format === "commander" ? (
    type === "commander" ? (
      <StyledCardItemControls>{commanderControls}</StyledCardItemControls>
    ) : (
      <StyledCardItemControls>{deleteControls}</StyledCardItemControls>
    )
  ) : (
    <StyledCardItemControls>
      {quantityIndicator}
      {quantityControls}
    </StyledCardItemControls>
  );
};

export default CardItemControls;
