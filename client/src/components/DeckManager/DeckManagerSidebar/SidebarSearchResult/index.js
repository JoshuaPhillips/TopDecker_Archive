import React from 'react';

import { validateAddCard } from '../../../../utils/validateAddCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { StyledSidebarSearchResult } from './styles';

const QuickSearchResult = props => {
  const { deck, card, list, addCardHandler, selectResult } = props;

  const available = validateAddCard(deck, card, list);

  return (
    <StyledSidebarSearchResult unavailable={!available}>
      <div className='SidebarSearchResultHeader'>
        <p onClick={available ? () => addCardHandler(deck, list, 'add', card) : null}>{card.name}</p>

        <div>
          <FontAwesomeIcon icon={faEye} onClick={() => selectResult(card)} />
        </div>
      </div>
    </StyledSidebarSearchResult>
  );
};

export default QuickSearchResult;
