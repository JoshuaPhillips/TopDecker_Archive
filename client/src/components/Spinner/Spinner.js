import React from 'react';

import classes from './Spinner.module.scss';

const Spinner = props => {
  return (
    <React.Fragment>
      <div className={classes.Spinner} />
      {props.children}
    </React.Fragment>
  );
};

export default Spinner;
