import React from 'react';

import TextModeCardItem from './TextModeCardItem';

import { StyledTextModeContainer, TextModeCardListContainer } from './styles';
import { SubSectionHeader } from '../../../../shared/Headers';

const TextModeContainer = props => {
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
    <StyledTextModeContainer>
      <SubSectionHeader>
        Main Deck ({totalMainDeckCount} / {deck.format === 'commander' ? 100 : 60})
      </SubSectionHeader>
      <TextModeCardListContainer>
        {deck.format === 'commander' && (
          <TextModeCardItem
            cardWithCounts={{ card: deck.commander, mainDeckCount: 1, sideboardCount: 0 }}
            deck={deck}
            type={'commander'}
          />
        )}

        {mainDeckList.map(cardWithCounts => {
          return (
            <TextModeCardItem
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
      </TextModeCardListContainer>

      {deck.format !== 'commander' && (
        <React.Fragment>
          <SubSectionHeader>Sideboard ({totalSideboardCount} / 15)</SubSectionHeader>
          <TextModeCardListContainer>
            {sideboardList.map(cardWithCounts => {
              return (
                <TextModeCardItem
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
          </TextModeCardListContainer>
        </React.Fragment>
      )}
    </StyledTextModeContainer>
  );
};

export default TextModeContainer;
