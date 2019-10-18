import React from 'react';

import Card from '../../../Card/Card';
import CardItemControls from '../CardItemControls';

import { StyledGalleryModeCardItem } from './styles';

const GalleryModeCardItem = props => {
  const {
    cardWithCounts: { card, mainDeckCount, sideboardCount },
    deck,
    type,
    totalMainDeckCount,
    totalSideboardCount,
    currentUserOwnsDeck,
    updateCardListHandler
  } = props;

  return (
    <StyledGalleryModeCardItem>
      <React.Fragment>
        <Card card={card} />
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
      </React.Fragment>
    </StyledGalleryModeCardItem>
  );
};

export default GalleryModeCardItem;
