import React from 'react';

import DeckViewModeMenu from './DeckViewModeMenu/DeckViewModeMenu';

import { capitalise } from '../../../../utils';

import classes from './DeckGalleryToolbar.module.scss';

const DeckGalleryToolbar = props => {
  const {
    sortMode,
    deck: { name, format, commander }
  } = props;

  return (
    <div className={classes.DeckGalleryToolbar}>
      <DeckViewModeMenu />
      <div>
        <h1>{name}</h1>

        <p>
          {capitalise(format)} {format === 'commander' ? <em>{` (${commander.name})`}</em> : null}
        </p>
        <button type='button'>Search for Cards</button>
        <button type='button'>Delete Deck</button>
      </div>

      <div>
        <button
          type='button'
          disabled={sortMode === 'alphabetical'}
          onClick={() => {
            props.changeSortModeHandler('alphabetical');
          }}>
          A - Z
        </button>
        <button
          type='button'
          disabled={sortMode === 'rarity'}
          onClick={() => {
            props.changeSortModeHandler('rarity');
          }}>
          Rarity
        </button>
        <button
          type='button'
          disabled={sortMode === 'color'}
          onClick={() => {
            props.changeSortModeHandler('color');
          }}>
          Color
        </button>
        <button
          type='button'
          disabled={sortMode === 'cmc'}
          onClick={() => {
            props.changeSortModeHandler('cmc');
          }}>
          CMC
        </button>
        <button
          type='button'
          disabled={sortMode === 'type'}
          onClick={() => {
            props.changeSortModeHandler('type');
          }}>
          Type
        </button>
      </div>
    </div>
  );
};

export default DeckGalleryToolbar;
