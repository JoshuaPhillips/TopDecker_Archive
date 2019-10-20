import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { validateAddCard } from '../../../utils/validateAddCard';

import {
  StyledSearchResultCardControls,
  SearchResultCardControlGroup,
  SearchResultCardQuantityContainer
} from './styles';

const SearchResultCardControls = props => {
  const { deck, result, updateCardList } = props;

  let matchedCard;

  if (deck) {
    matchedCard = deck.cardList.find(({ card }) => {
      return card.scryfall_id === result.scryfall_id;
    });
  }

  if (!deck) {
    return (
      <StyledSearchResultCardControls>
        <p>Please select a deck.</p>
      </StyledSearchResultCardControls>
    );
  }

  if (deck && result.legalities[deck.format] !== 'legal') {
    return (
      <StyledSearchResultCardControls>
        <p>Card not legal.</p>
      </StyledSearchResultCardControls>
    );
  }

  if (deck.format === 'commander') {
    if (result.scryfall_id === deck.commander.scryfall_id) {
      return (
        <StyledSearchResultCardControls>
          <p>This is your commander.</p>
        </StyledSearchResultCardControls>
      );
    }

    const combinedColorIdentity = [...deck.commander.color_identity, ...result.color_identity];
    const uniques = [...new Set(combinedColorIdentity)];

    if (uniques.length > deck.commander.color_identity.length) {
      // card is adding new colors to the list, therefore doesn't match the commander's colors
      return (
        <StyledSearchResultCardControls>
          <p>Doesn't match commander.</p>
        </StyledSearchResultCardControls>
      );
    }
    return (
      <StyledSearchResultCardControls>
        <button type='button' onClick={() => updateCardList('mainDeck', matchedCard ? 'remove' : 'add', result)}>
          {matchedCard ? 'Remove' : 'Add'}
        </button>
      </StyledSearchResultCardControls>
    );
  }

  return (
    <StyledSearchResultCardControls>
      <React.Fragment>
        <SearchResultCardControlGroup>
          <div>
            <p>Main</p>
          </div>

          <SearchResultCardQuantityContainer>
            <p>x {matchedCard ? matchedCard.mainDeckCount : '0'}</p>
          </SearchResultCardQuantityContainer>

          <div>
            <button
              type='button'
              disabled={!validateAddCard(deck, result, 'mainDeck')}
              onClick={() => updateCardList('mainDeck', 'add', result)}>
              <FontAwesomeIcon icon={faPlus} fixedWidth />
            </button>
            <button
              type='button'
              disabled={matchedCard && matchedCard.mainDeckCount === 0}
              onClick={() => updateCardList('mainDeck', 'remove', result)}>
              <FontAwesomeIcon icon={faMinus} fixedWidth />
            </button>
            <button
              type='button'
              disabled={matchedCard && matchedCard.mainDeckCount === 0}
              onClick={() => updateCardList('sideboard', 'transferToSideboard', result)}>
              <FontAwesomeIcon icon={faExchangeAlt} fixedWidth />
            </button>
          </div>
        </SearchResultCardControlGroup>

        <SearchResultCardControlGroup>
          <div>
            <p>Sideboard</p>
          </div>
          <div>
            <p>x {matchedCard ? matchedCard.sideboardCount : '0'}</p>
          </div>

          <div>
            <button
              type='button'
              disabled={!validateAddCard(deck, result, 'sideboard')}
              onClick={() => updateCardList('sideboard', 'add', result)}>
              <FontAwesomeIcon icon={faPlus} fixedWidth />
            </button>
            <button
              type='button'
              disabled={matchedCard && matchedCard.sideboardCount === 0}
              onClick={() => updateCardList('sideboard', 'remove', result)}>
              <FontAwesomeIcon icon={faMinus} fixedWidth />
            </button>
            <button
              type='button'
              disabled={matchedCard && matchedCard.sideboardCount === 0}
              onClick={() => updateCardList('mainDeck', 'transferToMainDeck', result)}>
              <FontAwesomeIcon icon={faExchangeAlt} fixedWidth />
            </button>
          </div>
        </SearchResultCardControlGroup>
      </React.Fragment>
    </StyledSearchResultCardControls>
  );
};

export default SearchResultCardControls;
