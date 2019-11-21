import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faExchangeAlt,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faRegularCheckCircle } from "@fortawesome/free-regular-svg-icons";

import { validateAddCard } from "../../../utils/validateAddCard";
import { capitalise } from "../../../utils/capitalise";

import {
  StyledSearchResultCardControls,
  SearchResultCardControlGroup
} from "./styles";

const SearchResultCardControls = props => {
  const { deck, result, updateCardList } = props;

  let matchedCard;

  if (deck) {
    matchedCard = deck.cardList.find(({ card }) => {
      return card.scryfall_id === result.scryfall_id;
    });
  }

  if (!deck) {
    return (
      <StyledSearchResultCardControls>
        <p>Please select a deck.</p>
      </StyledSearchResultCardControls>
    );
  }

  if (deck && result.legalities[deck.format] !== "legal") {
    return (
      <StyledSearchResultCardControls>
        <p>This card isn't legal in {capitalise(deck.format)}.</p>
      </StyledSearchResultCardControls>
    );
  }

  if (deck.format === "commander") {
    if (result.scryfall_id === deck.commander.scryfall_id) {
      return (
        <StyledSearchResultCardControls>
          <p>This is your commander.</p>
        </StyledSearchResultCardControls>
      );
    }

    const combinedColorIdentity = [
      ...deck.commander.color_identity,
      ...result.color_identity
    ];
    const uniques = [...new Set(combinedColorIdentity)];

    if (uniques.length > deck.commander.color_identity.length) {
      // card is adding new colors to the list, therefore doesn't match the commander's colors
      return (
        <StyledSearchResultCardControls>
          <p>Doesn't match commander.</p>
        </StyledSearchResultCardControls>
      );
    }
    return (
      <StyledSearchResultCardControls>
        <button
          type="button"
          onClick={() =>
            updateCardList("mainDeck", matchedCard ? "remove" : "add", result)
          }
        >
          <FontAwesomeIcon
            icon={matchedCard ? faCheckCircle : faRegularCheckCircle}
            fixedWidth
          />
        </button>
      </StyledSearchResultCardControls>
    );
  }

  return (
    <StyledSearchResultCardControls>
      <>
        <SearchResultCardControlGroup>
          <div>
            <p>Main</p>
          </div>

          <div>
            <p>x {matchedCard ? matchedCard.mainDeckCount : "0"}</p>
          </div>

          <div>
            <button
              type="button"
              disabled={!validateAddCard(deck, result, "mainDeck")}
              onClick={() => updateCardList("mainDeck", "add", result)}
            >
              <FontAwesomeIcon icon={faPlus} fixedWidth />
            </button>
            <button
              type="button"
              disabled={
                matchedCard !== undefined && matchedCard.mainDeckCount === 0
              }
              onClick={() => updateCardList("mainDeck", "remove", result)}
            >
              <FontAwesomeIcon icon={faMinus} fixedWidth />
            </button>
            <button
              type="button"
              disabled={
                matchedCard !== undefined && matchedCard.mainDeckCount === 0
              }
              onClick={() =>
                updateCardList("sideboard", "transferToSideboard", result)
              }
            >
              <FontAwesomeIcon icon={faExchangeAlt} fixedWidth />
            </button>
          </div>
        </SearchResultCardControlGroup>

        <SearchResultCardControlGroup>
          <div>
            <p>Side</p>
          </div>
          <div>
            <p>x {matchedCard ? matchedCard.sideboardCount : "0"}</p>
          </div>

          <div>
            <button
              type="button"
              disabled={!validateAddCard(deck, result, "sideboard")}
              onClick={() => updateCardList("sideboard", "add", result)}
            >
              <FontAwesomeIcon icon={faPlus} fixedWidth />
            </button>
            <button
              type="button"
              disabled={
                matchedCard !== undefined && matchedCard.sideboardCount === 0
              }
              onClick={() => updateCardList("sideboard", "remove", result)}
            >
              <FontAwesomeIcon icon={faMinus} fixedWidth />
            </button>
            <button
              type="button"
              disabled={
                matchedCard !== undefined && matchedCard.sideboardCount === 0
              }
              onClick={() =>
                updateCardList("mainDeck", "transferToMainDeck", result)
              }
            >
              <FontAwesomeIcon icon={faExchangeAlt} fixedWidth />
            </button>
          </div>
        </SearchResultCardControlGroup>
      </>
    </StyledSearchResultCardControls>
  );
};

export default SearchResultCardControls;
