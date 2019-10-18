import React from 'react';
import { Link } from 'react-router-dom';

import { capitalise } from '../../../../utils/capitalise';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faFileExport } from '@fortawesome/free-solid-svg-icons';

import { StyledDeckInspectorToolbar, CardTypeFilterIcon } from './styles';
import { DeckInspectorControlGroup } from '../../../../shared/DeckInspectorControlGroup';
import { Button, DangerButton } from '../../../../shared/Buttons';
import { ModeToggleContainer } from '../../../../shared/ModeToggles';

const DeckInspectorToolbar = props => {
  const {
    sortMode,
    deck: { name, format, commander },
    filters,
    currentUserOwnsDeck,
    viewMode,
    changeSortModeHandler,
    changeViewModeHandler,
    toggleFilterHandler
  } = props;

  const filterNames = ['creature', 'planeswalker', 'artifact', 'enchantment', 'sorcery', 'instant', 'land'];

  return (
    <StyledDeckInspectorToolbar>
      <div className='DeckInspectorToolbarHeader'>
        <div className='DeckInspectorTitle'>
          <h1>{name}</h1>

          <p>
            {capitalise(format)} {format === 'commander' ? <em>{` (${commander.name})`}</em> : null}
          </p>
        </div>
        {currentUserOwnsDeck && (
          <div className='DeckInspectorHeaderButtons'>
            <Link
              to={{
                pathname: '/search',
                state: {
                  deck: props.deck
                }
              }}>
              <Button type='button'>
                <FontAwesomeIcon icon={faSearch} fixedWidth />
                Search for Cards
              </Button>
            </Link>
            <Button type='button'>
              <FontAwesomeIcon icon={faFileExport} fixedWidth />
              Export Deck
            </Button>
            <DangerButton type='button'>
              <FontAwesomeIcon icon={faTrash} fixedWidth />
              Delete Deck
            </DangerButton>
          </div>
        )}
      </div>
      <div className='DeckInspectorToolbarControls'>
        <DeckInspectorControlGroup>
          <p>View as:</p>
          <ModeToggleContainer>
            <button type='button' disabled={viewMode === 'gallery'} onClick={() => changeViewModeHandler('gallery')}>
              Gallery
            </button>
            <button type='button' disabled={viewMode === 'text'} onClick={() => changeViewModeHandler('text')}>
              Text
            </button>

            <button type='button' disabled={viewMode === 'list'} onClick={() => changeViewModeHandler('list')}>
              List
            </button>
          </ModeToggleContainer>
        </DeckInspectorControlGroup>

        <DeckInspectorControlGroup>
          <p>Filters:</p>
          {filterNames.map(filter => {
            return (
              <CardTypeFilterIcon
                key={`filterIcon__${filter}`}
                symbol={filter}
                fixed
                size='2x'
                onClick={() => toggleFilterHandler(filter)}
                disabled={!filters[filter]}
              />
            );
          })}
        </DeckInspectorControlGroup>

        <DeckInspectorControlGroup>
          <p>Sort by:</p>
          <ModeToggleContainer>
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
          </ModeToggleContainer>
        </DeckInspectorControlGroup>
      </div>
    </StyledDeckInspectorToolbar>
  );
};

export default DeckInspectorToolbar;
