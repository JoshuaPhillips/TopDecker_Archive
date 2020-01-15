import React, { useState } from "react";

import Spinner from "../Spinner";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER_DECKS } from "./graphql";
import { UPDATE_CARD_LIST } from "../DeckManager/graphql";

import { generateCardList } from "../../utils/generateCardList";

import { SearchResultsWrapper, SearchResultsToolbar, SearchResultsCardListContainer } from "./styles";

import { SectionHeader } from "../../shared/Headers";
import { Button } from "../../shared/Buttons";
import { ModeToggleContainer } from "../../shared/ModeToggles";
import { StyledSelect } from "../../shared/Forms";
import SearchResultGalleryItem from "./SearchResultGalleryItem";
import SearchResultTextItem from "./SearchResultTextItem";
import SearchResultListItem from "./SearchResultListItem";

const SearchResults = props => {
  const { searchResults, searchingCards } = props;
  const [deckList, setDeckList] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(props.selectedDeck ? props.selectedDeck.id : "default");
  const [viewMode, setViewMode] = useState("gallery");
  const [selectedDeck, setSelectedDeck] = useState(null);

  const GetUserDecksQueryResponse = useQuery(GET_USER_DECKS, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      if (data) {
        setDeckList(data.getCurrentUser.decks);
      }
    }
  });

  const [UpdateCardListMutation] = useMutation(UPDATE_CARD_LIST);

  const updateCardListHandler = (listToUpdate, updateMode, updatedCard) => {
    const newDeck = generateCardList(selectedDeck, listToUpdate, updateMode, updatedCard);

    const filteredCardList = newDeck.cardList.map(({ card, mainDeckCount, sideboardCount }) => {
      return { scryfallId: card.scryfall_id, mainDeckCount, sideboardCount };
    });

    UpdateCardListMutation({
      variables: { deckId: selectedDeckId, cardList: filteredCardList },
      refetchQueries: [{ query: GET_USER_DECKS }]
    });

    setSelectedDeck(newDeck);
  };

  const selectDeckHandler = e => {
    setSelectedDeckId(e.target.value);
    let newSelectedDeck = deckList.find(({ id }) => {
      return id === e.target.value;
    });

    setSelectedDeck(newSelectedDeck);
  };

  return (
    <SearchResultsWrapper>
      <SectionHeader>Search Results</SectionHeader>
      <SearchResultsToolbar>
        <div>
          <ModeToggleContainer>
            <button type='button' disabled={viewMode === "gallery"} onClick={() => setViewMode("gallery")}>
              Gallery
            </button>
            <button type='button' disabled={viewMode === "text"} onClick={() => setViewMode("text")}>
              Text
            </button>
            <button type='button' disabled={viewMode === "list"} onClick={() => setViewMode("list")}>
              List
            </button>
          </ModeToggleContainer>
        </div>
        <div>
          <StyledSelect value={selectedDeckId} onChange={e => selectDeckHandler(e)}>
            <option value='default' disabled>
              {GetUserDecksQueryResponse.loading && GetUserDecksQueryResponse.called
                ? "Loading decks..."
                : "Select a Deck to Edit..."}
            </option>
            {deckList &&
              deckList.map(deck => {
                return (
                  <option key={deck.id} value={deck.id}>
                    {deck.name}
                  </option>
                );
              })}
          </StyledSelect>
        </div>

        <div>
          <NavLink to={`/decks/${selectedDeckId}`}>
            <Button type='button' disabled={selectedDeckId === "default"}>
              <FontAwesomeIcon icon={faArrowRight} fixedWidth />
              Go to Deck
            </Button>
          </NavLink>
        </div>
      </SearchResultsToolbar>
      {searchingCards ? (
        <Spinner />
      ) : (
        <SearchResultsCardListContainer>
          {searchResults.map(result => {
            return viewMode === "gallery" ? (
              <SearchResultGalleryItem
                key={result.scryfall_id}
                result={result}
                deck={selectedDeck}
                updateCardListHandler={updateCardListHandler}
              />
            ) : viewMode === "text" ? (
              <SearchResultTextItem
                key={result.scryfall_id}
                result={result}
                deck={selectedDeck}
                updateCardListHandler={updateCardListHandler}
              />
            ) : (
              <SearchResultListItem
                key={result.scryfall_id}
                result={result}
                deck={selectedDeck}
                updateCardListHandler={updateCardListHandler}
              />
            );
          })}
        </SearchResultsCardListContainer>
      )}
    </SearchResultsWrapper>
  );
};

export default SearchResults;
