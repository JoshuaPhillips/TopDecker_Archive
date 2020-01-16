export const calculateCardAllowance = (card, format) => {
  const uniqueRuleCardIds = {
    "e93f0c57-eb80-4dde-bdb0-326970491621": Infinity,
    "4f618e07-f06f-45d2-8512-e6cef88c0434": Infinity,
    "75f47b6e-9557-4853-b8d6-7602a91c59a7": Infinity,
    "464adbae-70ea-48e1-b8ae-b404766f7a5a": 7,
    "202c2323-6589-457a-af51-5528a98e7b30": Infinity,
    "ba42881b-9275-4b54-a17f-dec87d21a270": 1
  };

  const basicLandPattern = /^(Snow-Covered )?(Plains|Island|Swamp|Mountain|Forest|Wastes)$/;

  // if card's id is a key in the uniqueRuleCardIds, just return the relevant value
  if (Object.keys(uniqueRuleCardIds).includes(card.scryfall_id)) {
    return uniqueRuleCardIds[card.scryfall_id];
  }

  // is it a basic land?
  if (card.name.match(basicLandPattern) !== null) {
    return Infinity;
  }

  // default max 4
  return format === "commander" ? 1 : 4;
};
