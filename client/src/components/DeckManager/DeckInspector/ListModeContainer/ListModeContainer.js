import React from 'react';

import { StyledListModeContainer, StyledListModeCardListContainer } from './styles';
import ListModeCardItem from './ListModeCardItem';
import { SubSectionHeader } from '../../../../shared/Headers';

const ListModeContainer = props => {
  const { deck, mainDeckList, sideboardList, updateCardListHandler, currentUserOwnsDeck } = props;

  let totalMainDeckCount = deck.format === 'commander' ? 1 : 0;
  let totalSideboardCount = 0;

  mainDeckList.forEach(({ mainDeckCount }) => {
    totalMainDeckCount += mainDeckCount;
  });

  sideboardList.forEach(({ sideboardCount }) => {
    totalSideboardCount += sideboardCount;
  });

  return (
    <StyledListModeContainer>
      <SubSectionHeader>
        Main Deck ({totalMainDeckCount} / {deck.format === 'commander' ? 100 : 60})
      </SubSectionHeader>

      <StyledListModeCardListContainer>
        {deck.format === 'commander' && (
          <ListModeCardItem
            cardWithCounts={{ card: deck.commander, mainDeckCount: 1, sideboardCount: 0 }}
            deck={deck}
            type={'commander'}
            currentUserOwnsDeck={currentUserOwnsDeck}
          />
        )}
        {mainDeckList.map(cardWithCounts => {
          return (
            <ListModeCardItem
              key={cardWithCounts.card.scryfall_id}
              cardWithCounts={cardWithCounts}
              deck={deck}
              type={'mainDeck'}
              totalMainDeckCount={totalMainDeckCount}
              totalSideboardCount={totalSideboardCount}
              updateCardListHandler={updateCardListHandler}
              currentUserOwnsDeck={currentUserOwnsDeck}
            />
          );
        })}
      </StyledListModeCardListContainer>

      {deck.format !== 'commander' && (
        <React.Fragment>
          <SubSectionHeader>Sideboard ({totalSideboardCount} / 15)</SubSectionHeader>
          <StyledListModeCardListContainer>
            {sideboardList.map(cardWithCounts => {
              return (
                <ListModeCardItem
                  key={cardWithCounts.card.scryfall_id}
                  cardWithCounts={cardWithCounts}
                  deck={deck}
                  type={'sideboard'}
                  totalMainDeckCount={totalMainDeckCount}
                  totalSideboardCount={totalSideboardCount}
                  updateCardListHandler={updateCardListHandler}
                  currentUserOwnsDeck={currentUserOwnsDeck}
                />
              );
            })}
          </StyledListModeCardListContainer>
        </React.Fragment>
      )}
    </StyledListModeContainer>
  );
};

export default ListModeContainer;
