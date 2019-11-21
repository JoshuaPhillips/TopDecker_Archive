import React from "react";

import Card from "../../../Card";
import CardItemControls from "../CardItemControls";

import { StyledGalleryModeCardItem } from "./styles";

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
      <>
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
      </>
    </StyledGalleryModeCardItem>
  );
};

export default GalleryModeCardItem;
