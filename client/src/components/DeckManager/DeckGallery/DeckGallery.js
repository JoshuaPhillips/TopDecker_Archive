import React from 'react';

import DeckGalleryToolbar from './DeckGalleryToolbar/DeckGalleryToolbar';
import DeckGalleryCardList from './DeckGalleryCardList/DeckGalleryCardList';

import classes from './DeckGallery.module.scss';

const DeckGallery = props => {
  const { deck, sortMode } = props;

  return (
    <div className={classes.DeckGallery}>
      <DeckGalleryToolbar deck={deck} sortMode={sortMode} changeSortModeHandler={props.changeSortModeHandler} />
      <DeckGalleryCardList deck={deck} updateCardListHandler={props.updateCardListHandler} />
    </div>
  );
};

export default DeckGallery;
