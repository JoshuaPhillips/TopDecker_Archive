import React from 'react';

import filterCardList from '../../../../utils/filterCardList';

const ListModeContainer = props => {
  const {
    deck: { cardList, format, commander },
    filters
  } = props;

  const mainDeckList = cardList.filter(card => {
    return card.mainDeckCount !== 0;
  });

  const sideboardList = cardList.filter(card => {
    return card.sideboardCount !== 0;
  });

  const filteredMainDeckList = filterCardList(mainDeckList, filters);
  const filteredSideboardList = filterCardList(sideboardList, filters);

  return (
    <div>
      {format === 'commander' && <div>{commander.name}</div>}
      <div>
        {filteredMainDeckList.map(({ card }) => {
          return card.name;
        })}
      </div>
    </div>
  );
};

export default ListModeContainer;
