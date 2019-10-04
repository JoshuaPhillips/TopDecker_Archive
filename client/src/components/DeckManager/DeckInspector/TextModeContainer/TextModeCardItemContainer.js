import React from 'react';

import classes from './TextModeCardItemContainer.module.scss';

import convertTextToSymbol from '../../../../utils/convertTextToSymbols';

const TextModeCardItemContainer = props => {
  const { card } = props;

  return (
    <div className={classes.TextModeCardItemContainer}>
      <div className={classes.TextModeCardItemHeader}>
        <p>{card.name}</p>
        {convertTextToSymbol(card.mana_cost)}
      </div>
      <div className={classes.TextModeCardItemContent}>
        <p>{card.type_line}</p>
        {convertTextToSymbol(card.oracle_text)}
      </div>
    </div>
  );
};

export default TextModeCardItemContainer;
