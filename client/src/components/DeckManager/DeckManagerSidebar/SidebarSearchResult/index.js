import React from 'react';

import Card from '../../../Card/Card';
import SlideToggle from 'react-slide-toggle';

import { validateAddCard } from '../../../../utils/validateAddCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { StyledSidebarSearchResult } from './styles';

const QuickSearchResult = props => {
  const { deck, card, list, addCardHandler } = props;

  return (
    <SlideToggle collapsed>
      {({ toggle, setCollapsibleElement }) => (
        <StyledSidebarSearchResult>
          <div className='SidebarSearchResultHeader'>
            <p onClick={() => addCardHandler(deck, list, 'add', card)} disabled={!validateAddCard(deck, card, list)}>
              {card.name}
            </p>

            <div onClick={toggle} style={{ zIndex: '1000' }}>
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
