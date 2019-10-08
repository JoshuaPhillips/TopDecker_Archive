import React, { useState } from 'react';

import Card from '../Card/Card';

import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { SEARCH_CARDS } from '../DeckManager/DeckManagerSidebar/graphql';
import { GET_USER_DECKS } from './graphql';

import classes from './Search.module.scss';
import { generateCardList } from '../../utils/generateNewDeck';
import { UPDATE_CARD_LIST } from '../DeckManager/graphql';

const Search = props => {
  const [deckList, setDeckList] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(props.location.state ? props.location.state.deck.id : 'default');
  const [searchResults, setSearchResults] = useState([]);
  const [rawSearchParams, setRawSearchParams] = useState({
    name: '',
    oracle: {
      type: 'all',
      text: ''
    },
    type_line: {
      type: 'any',
      text: ''
    },
    set: '',
    colors: {
      type: 'exactly',
      colors: {
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false,
        colorless: false
      }
    },
    power: {
      comparison: 'less_than',
      value: ''
    },
    toughness: {
      comparison: 'less_than',
      value: ''
    },
    cmc: {
      comparison: 'less_than',
      value: ''
    },
    loyalty: {
      comparison: 'less_than',
      value: ''
    },
    rarity: {
      common: false,
      uncommon: false,
      rare: false,
      mythic: false
    },
    is: []
  });

  const client = useApolloClient();

  const formatSearchParams = () => {
    const formattedSearchParams = {
      ...rawSearchParams
    };

    formattedSearchParams.colors.colors = Object.keys(rawSearchParams.colors.colors).filter(color => {
      return rawSearchParams.colors.colors[color];
    });

    formattedSearchParams.rarity = Object.keys(rawSearchParams.rarity).filter(rarity => {
      return rawSearchParams.rarity[rarity];
    });

    formattedSearchParams.is = Object.keys(rawSearchParams.is).filter(is => {
      return rawSearchParams.is[is];
    });

    formattedSearchParams.set === ''
      ? delete formattedSearchParams.set
      : (formattedSearchParams.set = rawSearchParams.set.split(','));

    rawSearchParams.name === '' && delete formattedSearchParams.name;
    rawSearchParams.type_line.text === '' && delete formattedSearchParams.type_line;
    rawSearchParams.cmc.value === '' && delete formattedSearchParams.cmc;
    rawSearchParams.power.value === '' && delete formattedSearchParams.power;
    rawSearchParams.toughness.value === '' && delete formattedSearchParams.toughness;
    rawSearchParams.loyalty.value === '' && delete formattedSearchParams.loyalty;
    rawSearchParams.oracle.text === '' && delete formattedSearchParams.oracle;

    formattedSearchParams.colors.colors.length === 0 && delete formattedSearchParams.colors;
    formattedSearchParams.rarity.length === 0 && delete formattedSearchParams.rarity;
    formattedSearchParams.is.length === 0 && delete formattedSearchParams.is;

    return formattedSearchParams;
  };

  const searchCards = async submitEvent => {
    submitEvent.preventDefault();
    const { data } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams: formatSearchParams()
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
        <form onSubmit={searchCards}>
          <input
            type='text'
            placeholder='Card Name'
            value={rawSearchParams.name}
            onChange={e => setRawSearchParams({ ...rawSearchParams, name: e.target.value })}
          />
          <input
            type='text'
            placeholder='Card Text'
            value={rawSearchParams.oracle.text}
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                oracle: { type: rawSearchParams.oracle.type, text: e.target.value }
              })
            }
          />
          <select
            defaultValue={rawSearchParams.oracle.type}
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                oracle: { type: e.target.value, text: rawSearchParams.oracle.text }
              })
            }>
            <option value='all'>All</option>
            <option value='exact'>Exact</option>
            <option value='any'>Any</option>
          </select>

          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.colors.colors.white}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.white }
                  }
                })
              }
            />
            White
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.colors.colors.blue}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.blue }
                  }
                })
              }
            />
            Blue
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.colors.colors.black}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.black }
                  }
                })
              }
            />
            Black
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.colors.colors.red}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.red }
                  }
                })
              }
            />
            Red
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.colors.colors.green}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.green }
                  }
                })
              }
            />
            Green
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.colors.colors.colorless}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.colorless }
                  }
                })
              }
            />
            Colorless
          </label>

          <select
            defaultValue='exactly'
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                colors: { type: e.target.value, colors: { ...rawSearchParams.colors.colors } }
              })
            }>
            <option value='exactly'>Exactly these Colors</option>
            <option value='including'>Including these Colors</option>
            <option value='at_most'>At most these Colors</option>
          </select>

          <input
            type='text'
            placeholder='Type Line'
            value={rawSearchParams.type_line.text}
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                type_line: { type: rawSearchParams.type_line.type, text: e.target.value }
              })
            }
          />

          <label>
            Power:
            <select
              defaultValue={rawSearchParams.power.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  power: { comparison: e.target.value, value: rawSearchParams.power.value }
                })
              }>
              <option value='less_than'>less than</option>
              <option value='less_than_or_equal'>less than or equal to</option>
              <option value='equal'>equal to</option>
              <option value='greater_than_or_equal'>greater than or equal to</option>
              <option value='greater_than'>greater than</option>
            </select>
            <input
              type='number'
              value={rawSearchParams.power.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  power: { comparison: rawSearchParams.power.comparison, value: e.target.value }
                })
              }
            />
          </label>

          <label>
            Toughness:
            <select
              defaultValue={rawSearchParams.toughness.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  toughness: { comparison: e.target.value, value: rawSearchParams.toughness.value }
                })
              }>
              <option value='less_than'>less than</option>
              <option value='less_than_or_equal'>less than or equal to</option>
              <option value='equal'>equal to</option>
              <option value='greater_than_or_equal'>greater than or equal to</option>
              <option value='greater_than'>greater than</option>
            </select>
            <input
              type='number'
              value={rawSearchParams.toughness.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  toughness: { comparison: rawSearchParams.toughness.comparison, value: e.target.value }
                })
              }
            />
          </label>

          <label>
            CMC:
            <select
              defaultValue={rawSearchParams.cmc.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  cmc: { comparison: e.target.value, value: rawSearchParams.cmc.value }
                })
              }>
              <option value='less_than'>less than</option>
              <option value='less_than_or_equal'>less than or equal to</option>
              <option value='equal'>equal to</option>
              <option value='greater_than_or_equal'>greater than or equal to</option>
              <option value='greater_than'>greater than</option>
            </select>
            <input
              type='number'
              value={rawSearchParams.cmc.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  cmc: { comparison: rawSearchParams.cmc.comparison, value: e.target.value }
                })
              }
            />
          </label>

          <label>
            Loyalty:
            <select
              defaultValue={rawSearchParams.loyalty.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  loyalty: { comparison: e.target.value, value: rawSearchParams.loyalty.value }
                })
              }>
              <option value='less_than'>less than</option>
              <option value='less_than_or_equal'>less than or equal to</option>
              <option value='equal'>equal to</option>
              <option value='greater_than_or_equal'>greater than or equal to</option>
              <option value='greater_than'>greater than</option>
            </select>
            <input
              type='number'
              value={rawSearchParams.loyalty.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  loyalty: { comparison: rawSearchParams.loyalty.comparison, value: e.target.value }
                })
              }
            />
          </label>

          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.rarity.common}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    common: !rawSearchParams.rarity.common
                  }
                })
              }
            />
            Common
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.rarity.uncommon}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    uncommon: !rawSearchParams.rarity.uncommon
                  }
                })
              }
            />
            Uncommon
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.rarity.rare}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    rare: !rawSearchParams.rarity.rare
                  }
                })
              }
            />
            Rare
          </label>
          <label>
            <input
              type='checkbox'
              defaultChecked={rawSearchParams.rarity.mythic}
              onChange={() =>
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    mythic: !rawSearchParams.rarity.mythic
                  }
                })
              }
            />
            Mythic
          </label>

          <input
            type='text'
            placeholder='Set'
            onChange={e => setRawSearchParams({ ...rawSearchParams, set: e.target.value })}
          />

          <input
            type='text'
            placeholder='e.g. {1}{W}{W}'
            onChange={e => setRawSearchParams({ ...rawSearchParams, mana_cost: e.target.value })}
          />

          <label>
            {' '}
            <input
              type='checkbox'
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  is: { ...rawSearchParams.is, funny: !rawSearchParams.is.funny }
                })
              }
            />
            Include Un-Sets?
          </label>

          <button type='submit'>Search</button>

          <hr />
          <button type='button' onClick={() => console.log(rawSearchParams)}>
            Raw
          </button>
          <button type='button' onClick={() => console.log(formatSearchParams(rawSearchParams))}>
            Formatted
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
