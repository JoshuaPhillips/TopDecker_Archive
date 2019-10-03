const filterCardList = (cardList, filters) =>
  cardList.filter(({ card }) => {
    let selected = false;
    const typeLineWordArray = card.type_line.split(' ');

    for (var i = 0; i < typeLineWordArray.length; i++) {
      if (filters[typeLineWordArray[i].toLowerCase()]) {
        selected = true;
      }
    }

    return selected;
  });

export default filterCardList;
