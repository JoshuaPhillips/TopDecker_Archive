import React from 'react';

import convertTextToSymbols from '../../../../utils/convertTextToSymbols';
import { capitalise } from '../../../../utils/capitalise';

import { StyledListModeCardItem, ListModeCardDetails } from './styles';
import CardItemControls from '../CardItemControls';

const ListModeCardItem = props => {
  const {
    cardWithCounts: { card, mainDeckCount, sideboardCount },
    deck,
    type,
    totalMainDeckCount,
    totalSideboardCount,
    updateCardListHandler,
    currentUserOwnsDeck
  } = props;

  const renderManaCost = () => {
    if (card.mana_cost === null) {
      return card.card_faces.length !== 0 ? convertTextToSymbols(card.card_faces[0].mana_cost) : <p>-</p>;
    } else {
      return convertTextToSymbols(card.mana_cost);
    }
  };

  return (
    <StyledListModeCardItem key={card.scryfall_id}>
      <ListModeCardDetails>
        <p className='ListModeName'>{card.name}</p>
        <p className='ListModeTypeLine'>{card.type_line}</p>

        {renderManaCost()}
        <p className='ListModeRarity'>{capitalise(card.rarity)}</p>
      </ListModeCardDetails>
      <CardItemControls
        type={type}
        deck={deck}
        currentUserOwnsDeck={currentUserOwnsDeck}
        updateCardListHandler={updateCardListHandler}
        card={card}
        mainDeckCount={mainDeckCount}
        sideboardCount={sideboardCount}
        totalMainDeckCount={totalMainDeckCount}
        totalSideboardCount={totalSideboardCount}
      />
    </StyledListModeCardItem>
  );
};

export default ListModeCardItem;
