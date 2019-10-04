import React from 'react';
import { Link } from 'react-router-dom';

import { Mana } from '@saeris/react-mana';

import { capitalise } from '../../../../utils';

import classes from './DeckInspectorToolbar.module.scss';

const DeckInspectorToolbar = props => {
  const {
    sortMode,
    deck: { name, format, commander },
    filters = {
      creatures: true,
      planeswalkers: true,
      artifacts: true,
      enchantments: true,
      sorceries: true,
      instants: true,
      lands: true
    },
    currentUserOwnsDeck,
    viewMode,
    changeSortModeHandler,
    changeViewModeHandler,
    toggleFilterHandler
  } = props;

  return (
    <div className={classes.DeckInspectorToolbar}>
      <div>
        <p>Filters:</p>
        <form>
          <label>
            <Mana symbol='creature' fixed />
            <input
              type='checkbox'
              defaultChecked={filters.creatures}
              onChange={() => toggleFilterHandler('creature')}></input>
          </label>
          <label>
            <Mana symbol={'planeswalker'} fixed />
            <input
              type='checkbox'
              defaultChecked={filters.planeswalkers}
              onChange={() => toggleFilterHandler('planeswalker')}></input>
          </label>
          <label>
            <Mana symbol={'artifact'} fixed />
            <input
              type='checkbox'
              defaultChecked={filters.artifacts}
              onChange={() => toggleFilterHandler('artifact')}></input>
          </label>
          <label>
            <Mana symbol={'enchantment'} fixed />
            <input
              type='checkbox'
              defaultChecked={filters.enchantments}
              onChange={() => toggleFilterHandler('enchantment')}></input>
          </label>
          <label>
            <Mana symbol={'sorcery'} fixed />
            <input
              type='checkbox'
              defaultChecked={filters.sorceries}
              onChange={() => toggleFilterHandler('sorcery')}></input>
          </label>
          <label>
            <Mana symbol={'instant'} fixed />
            <input
              type='checkbox'
              defaultChecked={filters.instants}
              onChange={() => toggleFilterHandler('instant')}></input>
          </label>
          <label>
            <Mana symbol={'land'} fixed />
            <input type='checkbox' defaultChecked={filters.lands} onChange={() => toggleFilterHandler('land')}></input>
          </label>
        </form>
      </div>
      <div>
        <h1>{name}</h1>

        <p>
          {capitalise(format)} {format === 'commander' ? <em>{` (${commander.name})`}</em> : null}
        </p>
        {currentUserOwnsDeck && (
          <React.Fragment>
            <Link
              to={{
                pathname: '/search',
                state: {
                  deck: props.deck
                }
              }}>
              <button type='button'>Search for Cards</button>
            </Link>
            <button type='button'>Delete Deck</button>
          </React.Fragment>
        )}
      </div>
      <div>
        <div>
          <p>View as:</p>
          <button type='button' disabled={viewMode === 'gallery'} onClick={() => changeViewModeHandler('gallery')}>
            Gallery
          </button>
          <button type='button' disabled={viewMode === 'text'} onClick={() => changeViewModeHandler('text')}>
            Text
          </button>
          <button type='button' disabled={viewMode === 'stack'} onClick={() => changeViewModeHandler('stack')}>
            Stack
          </button>
          <button type='button' disabled={viewMode === 'list'} onClick={() => changeViewModeHandler('list')}>
            List
          </button>
        </div>

        <div>
          <p>Sort by:</p>
          <button
            type='button'
            disabled={sortMode === 'alphabetical'}
            onClick={() => {
              changeSortModeHandler('alphabetical');
            }}>
            A - Z
          </button>
          <button
            type='button'
            disabled={sortMode === 'rarity'}
            onClick={() => {
              changeSortModeHandler('rarity');
            }}>
            Rarity
          </button>
          <button
            type='button'
            disabled={sortMode === 'color'}
            onClick={() => {
              changeSortModeHandler('color');
            }}>
            Color
          </button>
          <button
            type='button'
            disabled={sortMode === 'cmc'}
            onClick={() => {
              changeSortModeHandler('cmc');
            }}>
            CMC
          </button>
          <button
            type='button'
            disabled={sortMode === 'type'}
            onClick={() => {
              changeSortModeHandler('type');
            }}>
            Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckInspectorToolbar;
