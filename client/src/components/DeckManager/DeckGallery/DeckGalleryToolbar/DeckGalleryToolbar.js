import React from 'react';

import DeckViewModeMenu from './DeckViewModeMenu/DeckViewModeMenu';

import { capitalise } from '../../../../utils';

import classes from './DeckGalleryToolbar.module.scss';

const DeckGalleryToolbar = props => {
  return (
    <div className={classes.DeckGalleryToolbar}>
      <DeckViewModeMenu style={{ border: '1px solid red' }} />
      <div>
        <h1>{props.name}</h1>

        <p>
          {capitalise(props.format)} {props.format === 'commander' ? <em>{` (${props.commander.name})`}</em> : null}
        </p>
      </div>
      <div>
        <button type='button' onClick={() => props.toggleDeleteMode(!props.deleteMode)}>
          Delete Cards
        </button>
      </div>
    </div>
  );
};

export default DeckGalleryToolbar;
