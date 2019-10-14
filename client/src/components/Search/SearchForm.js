import React, { useState } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { SEARCH_CARDS } from '../DeckManager/DeckManagerSidebar/graphql';
import { toast } from 'react-toastify';

import classes from './SearchForm.module.scss';

const SearchForm = props => {
  const { setSearchResults } = props;
  const client = useApolloClient();
  const [loadingResults, setLoadingResults] = useState(false);

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
    set: [],
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
    mana_cost: '',
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
    is: {
      funny: false,
      commander: false
    }
  });

  const colorAbbreviationMap = {
    white: 'W',
    blue: 'U',
    black: 'B',
    red: 'R',
    green: 'G',
    colorless: 'C'
  };

  const formatSearchParams = () => {
    let {
      name,
      oracle,
      type_line,
      set,
      colors,
      mana_cost,
      power,
      toughness,
      loyalty,
      cmc,
      rarity: rarities,
      is
    } = rawSearchParams;
    let formattedSearchParams = {};

    // format the simpler params

    if (name) formattedSearchParams.name = name;
    if (oracle.text) formattedSearchParams.oracle = { ...oracle };
    if (type_line.text) formattedSearchParams.type_line = { ...type_line };
    if (mana_cost) formattedSearchParams.mana_cost = mana_cost;
    if (power.value) formattedSearchParams.power = { ...power };
    if (toughness.value) formattedSearchParams.toughness = { ...toughness };
    if (loyalty.value) formattedSearchParams.loyalty = { ...loyalty };
    if (cmc.value) formattedSearchParams.cmc = { ...cmc };
    if (set.length !== 0) formattedSearchParams.set = set.split(',');

    // format colors

    let formattedColors = [];

    Object.keys(colors.colors).map(color => {
      if (colors.colors[color]) formattedColors.push(colorAbbreviationMap[color]);
      return null;
    });

    if (formattedColors.length !== 0) formattedSearchParams.colors = { type: colors.type, colors: formattedColors };

    // format rarity

    let formattedRarities = [];

    Object.keys(rarities).map(rarity => {
      if (rarities[rarity]) formattedRarities.push(rarity);
      return null;
    });

    if (formattedRarities.length !== 0) formattedSearchParams.rarity = formattedRarities;

    // format 'is'

    let formattedIs = [];

    Object.keys(is).map(option => {
      if (is[option]) formattedIs.push(option);
      return null;
    });

    if (formattedIs.length !== 0) formattedSearchParams.is = formattedIs;

    return formattedSearchParams;
  };

  const searchCards = async submitEvent => {
    submitEvent.preventDefault();
    setLoadingResults(true);
    const { data, errors } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams: formatSearchParams()
      },
      errorPolicy: 'all'
    });

    if (errors) {
      setLoadingResults(false);
      errors.forEach(error => {
        return toast.error(error.message);
      });
    } else {
      setLoadingResults(false);
      setSearchResults(data.searchCards.cards);
    }
  };

  return (
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
            onChange={() => {
              setRawSearchParams({
                ...rawSearchParams,
                colors: {
                  type: rawSearchParams.colors.type,
                  colors: { ...rawSearchParams.colors.colors, white: !rawSearchParams.colors.colors.white }
                }
              });
            }}
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
                  colors: { ...rawSearchParams.colors.colors, blue: !rawSearchParams.colors.colors.blue }
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
                  colors: { ...rawSearchParams.colors.colors, black: !rawSearchParams.colors.colors.black }
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
                  colors: { ...rawSearchParams.colors.colors, red: !rawSearchParams.colors.colors.red }
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
                  colors: { ...rawSearchParams.colors.colors, green: !rawSearchParams.colors.colors.green }
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
                  colors: { ...rawSearchParams.colors.colors, colorless: !rawSearchParams.colors.colors.colorless }
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

        <label>
          Mana Cost:
          <input
            type='text'
            placeholder='e.g. {1}{W}{W}'
            onChange={e => setRawSearchParams({ ...rawSearchParams, mana_cost: e.target.value })}
          />
        </label>

        <label>
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

        <button type='submit'>{loadingResults ? 'Searching...' : 'Search'}</button>

        <hr />
      </form>
    </div>
  );
};

export default SearchForm;
