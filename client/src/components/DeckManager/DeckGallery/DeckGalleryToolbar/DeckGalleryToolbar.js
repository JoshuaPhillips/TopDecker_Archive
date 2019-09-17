import React from 'react';
import { Link } from 'react-router-dom';

import DeckViewModeMenu from './DeckViewModeMenu/DeckViewModeMenu';

import { capitalise } from '../../../../utils';

import classes from './DeckGalleryToolbar.module.scss';

const DeckGalleryToolbar = props => {
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
    changeSortModeHandler,
    toggleFilterHandler
  } = props;

  return (
    <div className={classes.DeckGalleryToolbar}>
      <div>
        <p>Filters:</p>
        <form>
          <label>
            CRE
            <input
              type='checkbox'
              defaultChecked={filters.creatures}
              onChange={() => toggleFilterHandler('creature')}></input>
          </label>
          <label>
            PLA
            <input
              type='checkbox'
              defaultChecked={filters.planeswalkers}
              onChange={() => toggleFilterHandler('planeswalker')}></input>
          </label>
          <label>
            ART
            <input
              type='checkbox'
              defaultChecked={filters.artifacts}
              onChange={() => toggleFilterHandler('artifact')}></input>
          </label>
          <label>
            ENC
            <input
              type='checkbox'
              defaultChecked={filters.enchantments}
              onChange={() => toggleFilterHandler('enchantment')}></input>
          </label>
          <label>
            SOR
            <input
              type='checkbox'
              defaultChecked={filters.sorceries}
              onChange={() => toggleFilterHandler('sorcery')}></input>
          </label>
          <label>
            INS
            <input
              type='checkbox'
              defaultChecked={filters.instants}
              onChange={() => toggleFilterHandler('instant')}></input>
          </label>
          <label>
            LAN
            <input type='checkbox' defaultChecked={filters.lands} onChange={() => toggleFilterHandler('land')}></input>
          </label>
        </form>
      </div>
      <div>
        <h1>{name}</h1>

        <p>
          {capitalise(format)} {format === 'commander' ? <em>{` (${commander.name})`}</em> : null}
        </p>
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
      </div>
      <div>
        <DeckViewModeMenu />

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

export default DeckGalleryToolbar;
