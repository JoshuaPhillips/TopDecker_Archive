import React from 'react';

import Card from '../../../Card/Card';
import SlideToggle from 'react-slide-toggle';

import { validateAddCard } from '../../../../utils/validateAddCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { StyledSidebarSearchResult } from './styles';

const QuickSearchResult = props => {
  const { deck, card, list, addCardHandler } = props;

  const available = validateAddCard(deck, card, list);

  return (
    <SlideToggle collapsed>
      {({ toggle, setCollapsibleElement }) => (
        <StyledSidebarSearchResult unavailable={!available}>
          <div className='SidebarSearchResultHeader'>
            <p onClick={available ? () => addCardHandler(deck, list, 'add', card) : null}>{card.name}</p>

            <div onClick={toggle}>
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
          <div ref={setCollapsibleElement}>
            <Card card={card}></Card>
          </div>
        </StyledSidebarSearchResult>
      )}
    </SlideToggle>
  );
};

export default QuickSearchResult;
