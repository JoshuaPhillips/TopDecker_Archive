import React, { useState } from "react";

import DeckInspectorToolbar from "./DeckInspectorToolbar";

import CardListPlaceholder from "./CardListPlaceholder";
import GalleryModeCardItem from "./GalleryModeCardItem";
import TextModeCardItem from "./TextModeCardItem";
import ListModeCardItem from "./ListModeCardItem";

import filterCardList from "../../../utils/filterCardList";

import { StyledDeckInspector, DeckDetails, CardListContainer } from "./styles";
import { SubSectionHeader } from "../../../shared/Headers";

const DeckInspector = props => {
  const { deck, sortMode, filters, currentUserOwnsDeck, updateCardListHandler } = props;
  const [viewMode, setViewMode] = useState("text");

  const mainDeckList = deck.cardList.filter(card => {
    return card.mainDeckCount !== 0;
  });

  const sideboardList = deck.cardList.filter(card => {
    return card.sideboardCount !== 0;
  });

  const filteredMainDeckList = filterCardList(mainDeckList, filters);
  const filteredSideboardList = filterCardList(sideboardList, filters);

  let totalMainDeckCount = deck.format === "commander" ? 1 : 0;
  let totalSideboardCount = 0;

  mainDeckList.forEach(({ mainDeckCount }) => {
    totalMainDeckCount += mainDeckCount;
  });

  sideboardList.forEach(({ sideboardCount }) => {
    totalSideboardCount += sideboardCount;
  });

  const renderCardItem = (key, cardWithCounts, type) => {
    let cardItem;

    switch (viewMode) {
      case "gallery":
        cardItem = (
          <GalleryModeCardItem
            key={key}
            cardWithCounts={cardWithCounts}
            deck={deck}
            type={type}
            totalMainDeckCount={totalMainDeckCount}
            totalSideboardCount={totalSideboardCount}
            updateCardListHandler={updateCardListHandler}
            currentUserOwnsDeck={currentUserOwnsDeck}
          />
        );
        return cardItem;

      case "text":
        cardItem = (
          <TextModeCardItem
            key={key}
            cardWithCounts={cardWithCounts}
            deck={deck}
            type={type}
            totalMainDeckCount={totalMainDeckCount}
            totalSideboardCount={totalSideboardCount}
            updateCardListHandler={updateCardListHandler}
            currentUserOwnsDeck={currentUserOwnsDeck}
          />
        );
        return cardItem;

      case "list":
        cardItem = (
          <ListModeCardItem
            key={key}
            cardWithCounts={cardWithCounts}
            deck={deck}
            type={type}
            totalMainDeckCount={totalMainDeckCount}
            totalSideboardCount={totalSideboardCount}
            updateCardListHandler={updateCardListHandler}
            currentUserOwnsDeck={currentUserOwnsDeck}
          />
        );
        return cardItem;

      default:
        return (cardItem = <h2>Sorry, there was a problem loading your cards.</h2>);
    }
  };

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
      <DeckDetails>
        <SubSectionHeader>
          Main Deck ({totalMainDeckCount} / {deck.format === "commander" ? 100 : 60})
        </SubSectionHeader>
        {filteredMainDeckList.length === 0 ? (
          <>
            {deck.format === "commander" ? (
              <CardListContainer>
                {deck.format === "commander" &&
                  renderCardItem(
                    deck.commander.scryfall_id,
                    {
                      card: deck.commander,
                      mainDeckCount: 1,
                      sideboardCount: 0
                    },
                    "commander"
                  )}
              </CardListContainer>
            ) : (
              <CardListPlaceholder deck={deck} currentUserOwnsDeck={currentUserOwnsDeck} />
            )}
          </>
        ) : (
          <CardListContainer>
            {deck.format === "commander" &&
              renderCardItem(
                deck.commander.scryfall_id,
                { card: deck.commander, mainDeckCount: 1, sideboardCount: 0 },
                "commander"
              )}

            {filteredMainDeckList.map(cardWithCounts => {
              return renderCardItem(cardWithCounts.card.scryfall_id, cardWithCounts, "mainDeck");
            })}
          </CardListContainer>
        )}

        {deck.format !== "commander" && (
          <>
            <SubSectionHeader>Sideboard ({totalSideboardCount} / 15)</SubSectionHeader>
            {filteredSideboardList.length === 0 ? (
              <CardListPlaceholder deck={deck} currentUserOwnsDeck={currentUserOwnsDeck} />
            ) : (
              <CardListContainer>
                {filteredSideboardList.map(cardWithCounts => {
                  return renderCardItem(cardWithCounts.card.scryfall_id, cardWithCounts, "sideboard");
                })}
              </CardListContainer>
            )}
          </>
        )}
      </DeckDetails>
    </StyledDeckInspector>
  );
};

export default DeckInspector;
