import React from 'react';

import DeckViewModeMenu from './DeckViewModeMenu/DeckViewModeMenu';

import { capitalise } from '../../../../utils';

import classes from './DeckGalleryToolbar.module.scss';

const DeckGalleryToolbar = props => {
  const { name, format, commander } = props;
  return (
    <div className={classes.DeckGalleryToolbar}>
      <DeckViewModeMenu />
      <div>
        <h1>{name}</h1>

        <p>
          {capitalise(format)} {format === 'commander' ? <em>{` (${commander.name})`}</em> : null}
        </p>
      </div>
      <div>
        {format !== 'commander' && (
          <button type='button' onClick={() => props.toggleDeleteMode(!props.deleteMode)}>
            Delete Cards
          </button>
        )}
      </div>
    </div>
  );
};

export default DeckGalleryToolbar;
