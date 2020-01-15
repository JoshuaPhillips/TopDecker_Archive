const sortAlphabetically = cardList => {
  let sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
    if (cardA.name < cardB.name) {
      return -1;
    }

    if (cardA.name === cardB.name) {
      return 0;
    } else {
      return 1;
    }
  });

  return sortedCardList;
};

const sortByCmc = cardList => {
  let sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
    const cmcDifference = cardA.cmc - cardB.cmc;

    if (cmcDifference === 0) {
      if (cardA.name < cardB.name) {
        return -1;
      }

      if (cardA.name === cardB.name) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return cmcDifference;
    }
  });

  return sortedCardList;
};

const sortByColour = cardList => {
  const colors = ["W", "U", "B", "R", "G"];

  let sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
    // monocolored cards
    if (cardA.colors.length === 1) {
      if (cardB.colors.length !== 1) {
        return -1;
      } else {
        // sort by WUBRG
        const colorsIndexDifference =
          colors.findIndex(color => {
            return color === cardA.colors[0];
          }) -
          colors.findIndex(color => {
            return color === cardB.colors[0];
          });

        if (colorsIndexDifference === 0) {
          if (cardA.name < cardB.name) {
            return -1;
          }

          if (cardA.name === cardB.name) {
            return 0;
          } else {
            return 1;
          }
        }

        return colorsIndexDifference;
      }
    }

    // multicolored cards
    if (cardA.colors.length > 1) {
      if (cardB.colors.length === 0) {
        return -1;
      } else {
        return 0;
      }
    }

    return 0;
  });

  return sortedCardList;
};

const sortByRarity = cardList => {
  const rarities = ["common", "uncommon", "rare", "mythic"];

  let sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
    const rarityIndexDifference =
      rarities.findIndex(rarity => {
        return rarity === cardB.rarity;
      }) -
      rarities.findIndex(rarity => {
        return rarity === cardA.rarity;
      });

    if (rarityIndexDifference === 0) {
      if (cardA.name < cardB.name) {
        return -1;
      }

      if (cardA.name === cardB.name) {
        return 0;
      } else {
        return 1;
      }
    }

    return rarityIndexDifference;
  });

  return sortedCardList;
};

const sortByType = cardList => {
  const types = ["Creature", "Planeswalker", "Artifact", "Enchantment", "Instant", "Sorcery", "Land"];
  let cardTypeMatchMap = {
    creature: [],
    planeswalker: [],
    artifact: [],
    enchantment: [],
    instant: [],
    sorcery: [],
    land: []
  };

  for (var j = 0; j < cardList.length; j++) {
    // for each card, split that card's typeline into words
    const typeLineWordArray = cardList[j].card.type_line.split(" ");

    for (var i = 0; i < typeLineWordArray.length; i++) {
      // for each of those words, check if it's included in the 'types' array above
      const matchingTypeIndex = types.indexOf(typeLineWordArray[i]);

      if (matchingTypeIndex !== -1) {
        if (typeLineWordArray[i] === "Artifact" && typeLineWordArray[i + 1] === "Creature") {
          cardTypeMatchMap.creature.push(cardList[j]);
          break;
        } else if (typeLineWordArray[i] === "Enchantment" && typeLineWordArray[i + 1] === "Creature") {
          cardTypeMatchMap.creature.push(cardList[j]);
          break;
        } else {
          cardTypeMatchMap[types[matchingTypeIndex].toLowerCase()].push(cardList[j]);
          break;
        }
      }
    }
  }

  for (var k = 0; k < Object.keys(cardTypeMatchMap).length; k++) {
    cardTypeMatchMap[Object.keys(cardTypeMatchMap)[k]].sort(({ card: cardA }, { card: cardB }) => {
      if (cardA.name < cardB.name) {
        return -1;
      }

      if (cardA.name === cardB.name) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  const result = [
    ...cardTypeMatchMap.creature,
    ...cardTypeMatchMap.planeswalker,
    ...cardTypeMatchMap.artifact,
    ...cardTypeMatchMap.enchantment,
    ...cardTypeMatchMap.instant,
    ...cardTypeMatchMap.sorcery,
    ...cardTypeMatchMap.land
  ];

  return result;
};

export const sortCardList = (cardList, sortMode) => {
  let alphabatizedCardList = sortAlphabetically(cardList);

  switch (sortMode) {
    case "cmc":
      alphabatizedCardList = sortByCmc(alphabatizedCardList);
      break;

    case "color":
      alphabatizedCardList = sortByColour(alphabatizedCardList);
      break;

    case "rarity":
      alphabatizedCardList = sortByRarity(alphabatizedCardList);
      break;

    case "type":
      alphabatizedCardList = sortByType(alphabatizedCardList);
      break;

    default:
      break;
  }

  return alphabatizedCardList;
};
