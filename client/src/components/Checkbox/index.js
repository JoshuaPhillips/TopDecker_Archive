import React from 'react';

import { StyledCheckbox } from './styles';

const Checkbox = props => {
  return (
    <StyledCheckbox onClick={props.onClick} selected={props.selected}>
      <span className='checkbox-custom'></span>
      <label>{props.children}</label>
    </StyledCheckbox>
  );
};

export default Checkbox;
