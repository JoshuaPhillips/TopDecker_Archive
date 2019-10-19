import React from 'react';

import { StyledCheckbox } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Checkbox = props => {
  return (
    <StyledCheckbox onClick={props.onClick} selected={props.selected}>
      <span className='checkbox-custom'>
        <FontAwesomeIcon icon={faCheck} fixedWidth />
      </span>
      <label>{props.children}</label>
    </StyledCheckbox>
  );
};

export default Checkbox;
