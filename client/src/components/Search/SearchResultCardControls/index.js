import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faExchangeAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

import { validateAddCard } from '../../../utils/validateAddCard';

import { StyledSearchResultCardControlsContainer } from './styles';

const SearchResultCardControls = props => {
  const { deck, result, updateCardList } = props;

  if (!deck) {
    return (
      <StyledSearchResultCardControlsContainer>
        <p>Please select a deck.</p>
      </StyledSearchResultCardControlsContainer>
    );
  }

  const matchedCard = deck.cardList.find(({ card }) => {
    return card.scryfall_id === result.scryfall_id;
  });

  if (deck.format === 'commander') {
    return (
      <StyledSearchResultCardControlsContainer>
        {matchedCard ? (
          <button type='button' onClick={() => updateCardList('mainDeck', 'remove', result)}>
            Remove
          </button>
        ) : (
          <button type='button' onClick={() => updateCardList('mainDeck', 'add', result)}>
            Add
          </button>
        )}
      </StyledSearchResultCardControlsContainer>
    );
  }

  return (
    <StyledSearchResultCardControlsContainer>
      {deck.format !== 'commander' && (
        <React.Fragment>
          <SearchResultCardControls>
            <div>
              <p>Main Deck</p>
            </div>
            <div>
              {[...Array(matchedCard ? matchedCard.mainDeckCount : 0)].map((_, index) => {
                return (
                  <FontAwesomeIcon key={`${result.scryfall_id}__mainDeck__active__${index}`} icon={faStar} fixedWidth />
                );
              })}
              {[...Array(matchedCard ? 4 - matchedCard.mainDeckCount : 4)].map((_, index) => {
                return (
                  <FontAwesomeIcon
                    key={`${result.scryfall_id}__mainDeck__inactive__${index}`}
                    icon={faRegularStar}
                    fixedWidth
                  />
                );
              })}
            </div>

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
          </SearchResultCardControls>

          <SearchResultCardControls>
            <div>
              <p>Sideboard</p>
            </div>
            <div>
              {[...Array(matchedCard ? matchedCard.sideboardCount : 0)].map((_, index) => {
                return (
                  <FontAwesomeIcon
                    key={`${result.scryfall_id}__sideboard__active__${index}`}
                    icon={faStar}
                    fixedWidth
                  />
                );
              })}
              {[...Array(matchedCard ? 4 - matchedCard.sideboardCount : 4)].map((_, index) => {
                return (
                  <FontAwesomeIcon
                    key={`${result.scryfall_id}__sideboard__inactive__${index}`}
                    icon={faRegularStar}
                    fixedWidth
                  />
                );
              })}
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
          </SearchResultCardControls>
        </React.Fragment>
      )}
    </StyledSearchResultCardControlsContainer>
  );
};

export default SearchResultCardControls;
