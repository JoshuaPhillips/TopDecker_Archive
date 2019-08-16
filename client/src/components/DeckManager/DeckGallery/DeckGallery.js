import React, { useState } from 'react';

import DeckGalleryToolbar from './DeckGalleryToolbar/DeckGalleryToolbar';
import DeckGalleryCardList from './DeckGalleryCardList/DeckGalleryCardList';

import classes from './DeckGallery.module.scss';

const DeckGallery = props => {
  // deck.cardList is an array of objects with structure {quantity: int, scryfallId: string}
  const { deck } = props;
  const [deleteMode, toggleDeleteMode] = useState(false);

  return (
    <div className={classes.DeckGallery}>
      <DeckGalleryToolbar
        name={deck.name}
        format={deck.format}
        commander={deck.commander}
        deleteMode={deleteMode}
        toggleDeleteMode={toggleDeleteMode}
      />
      <DeckGalleryCardList cardList={deck.cardList} deleteMode={deleteMode} currentDeckId={props.currentDeckId} />
    </div>
  );
};

export default DeckGallery;
