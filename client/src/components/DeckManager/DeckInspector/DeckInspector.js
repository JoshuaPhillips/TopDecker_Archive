import React, { useState } from 'react';

import DeckInspectorToolbar from './DeckInspectorToolbar/DeckInspectorToolbar';
import GalleryModeContainer from './GalleryModeContainer/GalleryModeContainer';
import ListModeContainer from './ListModeContainer/ListModeContainer';

import classes from './DeckInspector.module.scss';

const DeckInspector = props => {
  const { deck, sortMode, filters } = props;
  const [viewMode, setViewMode] = useState('gallery');

  let cardListContainer;

  switch (viewMode) {
    case 'gallery':
      cardListContainer = (
        <GalleryModeContainer
          deck={deck}
          filters={filters}
          currentUserOwnsDeck={props.currentUserOwnsDeck}
          updateCardListHandler={props.updateCardListHandler}
        />
      );
      break;

    case 'list':
      cardListContainer = (
        <ListModeContainer
          deck={deck}
          filters={filters}
          currentUserOwnsDeck={props.currentUserOwnsDeck}
          updateCardListHandler={props.updateCardListHandler}
        />
      );
      break;

    default:
      cardListContainer = <h2>Sorry, there was a problem viewing your cards.</h2>;
  }

  const changeViewModeHandler = newMode => {
    setViewMode(newMode);
  };

  return (
    <div className={classes.DeckInspector}>
      <DeckInspectorToolbar
        deck={deck}
        sortMode={sortMode}
        viewMode={viewMode}
        changeViewModeHandler={changeViewModeHandler}
        changeSortModeHandler={props.changeSortModeHandler}
        currentUserOwnsDeck={props.currentUserOwnsDeck}
        toggleFilterHandler={props.toggleFilterHandler}
      />
      {cardListContainer}
    </div>
  );
};

export default DeckInspector;
