export const sortCardList = (cardList, sortMode) => {
  let sortedCardList = cardList;
  switch (sortMode) {
    case 'alphabetical':
      sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
        if (cardA.name < cardB.name) {
          return -1;
        }

        if (cardA.name === cardB.name) {
          return 0;
        } else {
          return 1;
        }
      });
      break;

    case 'cmc':
      sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
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
      break;

    case 'color':
      const colors = ['W', 'U', 'B', 'R', 'G'];

      sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
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
      break;

    case 'rarity':
      const rarities = ['common', 'uncommon', 'rare', 'mythic'];
      sortedCardList = cardList.sort(({ card: cardA }, { card: cardB }) => {
        const rarityIndexDifference =
          rarities.findIndex(rarity => {
            return rarity === cardA.rarity;
          }) -
          rarities.findIndex(rarity => {
            return rarity === cardB.rarity;
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
      break;

    case 'type':
      const types = ['Creature', 'Planeswalker', 'Artifact', 'Enchantment', 'Instant', 'Sorcery', 'Land'];
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
        const typeLineWordArray = cardList[j].card.type_line.split(' ');
        for (var i = 0; i < typeLineWordArray.length; i++) {
          const matchingTypeIndex = types.indexOf(typeLineWordArray[i]);
          if (matchingTypeIndex !== -1) {
            cardTypeMatchMap[types[matchingTypeIndex].toLowerCase()].push(cardList[j]);
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

      console.log(result);

      sortedCardList = result;

      break;

    default:
      break;
  }

  return sortedCardList;
};
