import { calculateCardAllowance } from "./calculateCardAllowance";

export const validateAddCard = (deck, card, list) => {
  const { format, cardList, commander } = deck;
  const { scryfall_id, legalities } = card;
  const maxCardAllowance = calculateCardAllowance(card, deck.format);

  let totalSideboardCount = 0;

  cardList.forEach(card => {
    totalSideboardCount += card.sideboardCount;
  });

  // if card is outright not allowed or not allowed in this format
  if (legalities[format] === "not_legal" || legalities[format] === "banned") {
    return false;
  }

  if (list === "sideboard" && totalSideboardCount >= 15) {
    return false;
  }

  const matchedCard = cardList.find(({ card: cardListCard }) => {
    return cardListCard.scryfall_id === scryfall_id;
  });

  // if card doesn't fit the commander's color identity, or if it's the commander itself
  if (format === "commander") {
    if (card.scryfall_id === commander.scryfall_id) {
      return false;
    }

    const combinedColorIdentity = [...commander.color_identity, ...card.color_identity];
    const uniques = [...new Set(combinedColorIdentity)];

    if (uniques.length > deck.commander.color_identity.length) {
      // card is adding new colors to the list, therefore doesn't match the commander's colors
      return false;
    }
  }

  if (matchedCard !== undefined && matchedCard.mainDeckCount + matchedCard.sideboardCount >= maxCardAllowance) {
    return false;
  }

  return true;
};
