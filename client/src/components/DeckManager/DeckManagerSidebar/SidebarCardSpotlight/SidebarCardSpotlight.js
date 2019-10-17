import React from 'react';
import Card from '../../../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { StyledSidebarCardSpotlight } from './styles';

const SidebarCardSpotlight = props => {
  const { card, deselectCard } = props;
  return (
    <StyledSidebarCardSpotlight>
      <Card card={card} />
      <div>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p onClick={() => deselectCard(null)}>Back</p>
      </div>
    </StyledSidebarCardSpotlight>
  );
};

export default SidebarCardSpotlight;
