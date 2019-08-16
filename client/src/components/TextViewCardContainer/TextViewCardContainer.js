import React from 'react';

import classes from './TextViewCardContainer.module.scss';

const TextViewCardContainer = props => {
  return (
    <div className={classes.TextViewCardContainer}>
      <p>{props.card.name}</p>
      <p>{`x ${props.quantity}`}</p>
    </div>
  );
};

export default TextViewCardContainer;
