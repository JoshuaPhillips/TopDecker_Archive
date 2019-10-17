import React, { useState } from 'react';

import DeckInspectorToolbar from './DeckInspectorToolbar/DeckInspectorToolbar';
import GalleryModeContainer from './GalleryModeContainer/GalleryModeContainer';
import ListModeContainer from './ListModeContainer/ListModeContainer';
import TextModeContainer from './TextModeContainer/TextModeContainer';

import filterCardList from '../../../utils/filterCardList';

import { StyledDeckInspector } from './styles';

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
          currentUserOwnsDeck={props.currentUserOwnsDeck}
          updateCardListHandler={props.updateCardListHandler}
        />
      );
      break;

    case 'text':
      cardListContainer = (
        <TextModeContainer
          deck={deck}
          mainDeckList={filteredMainDeckList}
          sideboardList={filteredSideboardList}
          currentUserOwnsDeck={props.currentUserOwnsDeck}
          updateCardListHandler={props.updateCardListHandler}
        />
      );
      break;

    default:
      cardListContainer = <h2>Sorry, there was a problem viewing your cards.</h2>;
  }

  return (
    <StyledDeckInspector>
      <DeckInspectorToolbar
        deck={deck}
        sortMode={sortMode}
        viewMode={viewMode}
        currentUserOwnsDeck={props.currentUserOwnsDeck}
        changeViewModeHandler={newMode => {
          setViewMode(newMode);
        }}
        changeSortModeHandler={props.changeSortModeHandler}
        toggleFilterHandler={props.toggleFilterHandler}
        filters={filters}
      />
      {cardListContainer}
    </StyledDeckInspector>
  );
};

export default DeckInspector;
