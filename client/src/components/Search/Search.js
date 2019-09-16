import React, { useState } from 'react';

import Card from '../Card/Card';

import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { SEARCH_CARDS } from '../DeckManager/QuickSearchSidebar/graphql';
import { GET_USER_DECKS } from './graphql';

import classes from './Search.module.scss';
import { generateCardList } from '../../utils/generateNewDeck';
import { UPDATE_CARD_LIST } from '../DeckManager/graphql';

const Search = props => {
  const [deckList, setDeckList] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(props.location.state ? props.location.state.deck.id : 'default');
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: ''
  });

  const client = useApolloClient();

  const searchCards = async () => {
    const { data } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  const GetUserDecksQueryResponse = useQuery(GET_USER_DECKS, {
    onCompleted(data) {
      setDeckList(data.getCurrentUser.decks);
    }
  });

  const [UpdateCardListMutation] = useMutation(UPDATE_CARD_LIST);

  const addCardToDeck = (listToUpdate, updatedCard) => {
    const deck = deckList.find(({ id }) => {
      return id === selectedDeckId;
    });

    const newDeck = generateCardList(deck, listToUpdate, 'add', updatedCard);

    const filteredCardList = newDeck.cardList.map(({ card, mainDeckCount, sideboardCount }) => {
      return { scryfallId: card.scryfall_id, mainDeckCount, sideboardCount };
    });

    UpdateCardListMutation({
      variables: { deckId: selectedDeckId, cardList: filteredCardList },
      refetchQueries: [{ query: GET_USER_DECKS }]
    });
  };

  const validateCardLegality = card => {
    const deck = deckList.find(({ id }) => {
      return id === selectedDeckId;
    });
    const { format, cardList } = deck;
    const { legalities } = card;

    const deckCard = cardList.find(cardInDeck => {
      return cardInDeck.card.scryfall_id === card.scryfall_id;
    });

    if (deckCard === undefined) {
      return true;
    }

    if (format === 'commander') {
      if (legalities['commander'] !== 'legal') {
        return false;
      }

      if (deckCard !== undefined) {
        return false;
      }

      const combinedColorIdentity = [...deck.commander.color_identity, ...card.color_identity];
      const uniques = [...new Set(combinedColorIdentity)];

      if (uniques.length > deck.commander.color_identity.length) {
        // card is adding new colors to the list, therefore doesn't match the commander's colors
        return false;
      }

      return true;
    } else {
      if (deckCard.mainDeckCount + deckCard.sideboardCount === 4) {
        return false;
      }
      return legalities[format] === 'legal';
    }
  };

  return (
    <main className={classes.Search}>
      <div className={classes.SearchFormContainer}>
        <h1>Search</h1>
        <form>
          <input
            type='text'
            placeholder='Card Name'
            value={searchParams.name}
            onChange={e => setSearchParams({ ...searchParams, name: e.target.value })}
          />
          <button type='button' onClick={() => searchCards()}>
            Search
          </button>
        </form>
      </div>
      <div className={classes.SearchResultsContainer}>
        <h1>Search Results</h1>
        <p>Add Cards to: </p>
        <select value={selectedDeckId} onChange={e => setSelectedDeckId(e.target.value)}>
          <option value='default' disabled>
            {GetUserDecksQueryResponse.loading && GetUserDecksQueryResponse.called
              ? 'Loading decks...'
              : 'Select a Deck to Edit...'}
          </option>
          {deckList &&
            deckList.map(deck => {
              return (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              );
            })}
        </select>
        <div className={classes.SearchResultsCardListContainer}>
          {searchResults.map(result => {
            return (
              <div key={result.scryfall_id}>
                <Card card={result} />
                <button
                  type='button'
                  disabled={selectedDeckId === 'default' || !validateCardLegality(result)}
                  onClick={() => addCardToDeck('mainDeck', result)}>
                  Add to Main Deck
                </button>
                <button
                  type='button'
                  disabled={selectedDeckId === 'default' || !validateCardLegality(result)}
                  onClick={() => addCardToDeck('sideboard', result)}>
                  Add to Sideboard
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Search;
