import React, { useState } from 'react';

import DeckInspectorToolbar from './DeckInspectorToolbar/DeckInspectorToolbar';
import GalleryModeContainer from './GalleryModeContainer/GalleryModeContainer';
import ListModeContainer from './ListModeContainer/ListModeContainer';

import filterCardList from '../../../utils/filterCardList';

import classes from './DeckInspector.module.scss';

const DeckInspector = props => {
  const { deck, sortMode, filters } = props;
  const [viewMode, setViewMode] = useState('list');

  const mainDeckList = deck.cardList.filter(card => {
    return card.mainDeckCount !== 0;
  });

  const sideboardList = deck.cardList.filter(card => {
    return card.sideboardCount !== 0;
  });

  const filteredMainDeckList = filterCardList(mainDeckList, filters);
  const filteredSideboardList = filterCardList(sideboardList, filters);

  let cardListContainer;

  switch (viewMode) {
    case 'gallery':
      cardListContainer = (
        <GalleryModeContainer
          deck={deck}
          mainDeckList={filteredMainDeckList}
          sideboardList={filteredSideboardList}
          format={deck.format}
          commander={deck.commander}
          currentUserOwnsDeck={props.currentUserOwnsDeck}
          updateCardListHandler={props.updateCardListHandler}
        />
      );
      break;

    case 'list':
      cardListContainer = (
        <ListModeContainer
          deck={deck}
          mainDeckList={filteredMainDeckList}
          sideboardList={filteredSideboardList}
          format={deck.format}
          commander={deck.commander}
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
