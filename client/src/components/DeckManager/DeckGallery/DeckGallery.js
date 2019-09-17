import React from 'react';

import DeckGalleryToolbar from './DeckGalleryToolbar/DeckGalleryToolbar';
import DeckGalleryCardList from './DeckGalleryCardList/DeckGalleryCardList';

import classes from './DeckGallery.module.scss';

const DeckGallery = props => {
  const { deck, sortMode, filters } = props;

  return (
    <div className={classes.DeckGallery}>
      <DeckGalleryToolbar
        deck={deck}
        sortMode={sortMode}
        currentUserOwnsDeck={props.currentUserOwnsDeck}
        changeSortModeHandler={props.changeSortModeHandler}
        toggleFilterHandler={props.toggleFilterHandler}
      />
      <DeckGalleryCardList
        deck={deck}
        filters={filters}
        currentUserOwnsDeck={props.currentUserOwnsDeck}
        updateCardListHandler={props.updateCardListHandler}
      />
    </div>
  );
};

export default DeckGallery;
