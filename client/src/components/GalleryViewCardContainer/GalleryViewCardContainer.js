import React from 'react';

import Card from '../Card/Card';

const GalleryViewCardContainer = props => {
  const { card, quantity } = props;
  return (
    <React.Fragment>
      <div style={{ width: 'calc(25% - 1rem)', maxWidth: '20vw', margin: '.5rem' }}>
        <Card card={card} withQuantityIndicator quantity={quantity} />
      </div>
    </React.Fragment>
  );
};

export default GalleryViewCardContainer;
