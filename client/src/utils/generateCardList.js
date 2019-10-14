export const generateCardList = (deck, listToUpdate, updateMode, updatedCard) => {
  let { cardList, format } = deck;
  let newDeck = {
    ...deck
  };

  const maximumCardAllowance = format === 'commander' ? 1 : 4;

  // find matching card, if it exists

  const matchingCardIndex = cardList.findIndex(({ card }) => {
    return card.scryfall_id === updatedCard.scryfall_id;
  });

  switch (updateMode) {
    case 'add':
      if (matchingCardIndex === -1) {
        newDeck.cardList.push({
          card: updatedCard,
          mainDeckCount: listToUpdate === 'mainDeck' ? 1 : 0,
          sideboardCount: listToUpdate === 'sideboard' ? 1 : 0
        });
        break;
      } else if (
        newDeck.cardList[matchingCardIndex].mainDeckCount + newDeck.cardList[matchingCardIndex].sideboardCount ===
        maximumCardAllowance
      ) {
        break;
      } else {
        newDeck.cardList[matchingCardIndex][`${listToUpdate}Count`] += 1;
      }
      break;

    case 'remove':
      if (matchingCardIndex === -1) {
        break;
      } else if (
        newDeck.cardList[matchingCardIndex].mainDeckCount + newDeck.cardList[matchingCardIndex].sideboardCount ===
        1
      ) {
        newDeck.cardList = cardList.filter(({ card }) => {
          return card.scryfall_id !== updatedCard.scryfall_id;
        });
      } else {
        newDeck.cardList[matchingCardIndex][`${listToUpdate}Count`] -= 1;
      }
      break;

    case 'playset':
      if (matchingCardIndex === -1) {
        newDeck.cardList.push({
          card: updatedCard,
          [`${listToUpdate}Count`]: 4
        });
        break;
      } else if (
        newDeck.cardList[matchingCardIndex].mainDeckCount + newDeck.cardList[matchingCardIndex].sideboardCount + 4 >
        maximumCardAllowance
      ) {
        break;
      } else {
        newDeck.cardList[matchingCardIndex][`${listToUpdate}Count`] += 4;
      }
      break;

    case 'transferToSideboard':
      if (matchingCardIndex === -1) {
        break;
      } else {
        newDeck.cardList[matchingCardIndex].mainDeckCount -= 1;
        newDeck.cardList[matchingCardIndex].sideboardCount += 1;
      }
      break;

    case 'transferToMainDeck':
      if (matchingCardIndex === -1) {
        break;
      } else {
        newDeck.cardList[matchingCardIndex].mainDeckCount += 1;
        newDeck.cardList[matchingCardIndex].sideboardCount -= 1;
      }
      break;

    case 'delete':
      if (matchingCardIndex === -1) {
        break;
      } else {
        newDeck.cardList = cardList.filter(({ card }) => {
          return card.scryfall_id !== updatedCard.scryfall_id;
        });
      }
      break;

    default:
      break;
  }

  return newDeck;
};
