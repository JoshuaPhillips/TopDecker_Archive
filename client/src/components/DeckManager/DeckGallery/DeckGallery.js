import React, { useState } from 'react';

import DeckGalleryToolbar from './DeckGalleryToolbar/DeckGalleryToolbar';
import DeckGalleryCardList from './DeckGalleryCardList/DeckGalleryCardList';

import classes from './DeckGallery.module.scss';

const DeckGallery = props => {
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
      <DeckGalleryCardList
        changeCardQuantity={props.changeCardQuantity}
        deck={deck}
        deleteMode={deleteMode}
        deleteCardHandler={props.deleteCardHandler}
      />
    </div>
  );
};

export default DeckGallery;
