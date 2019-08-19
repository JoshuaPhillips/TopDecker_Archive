import React, { useState } from 'react';

import classes from './Card.module.scss';

const Card = props => {
  const [transformed, toggleTransform] = useState(false);
  const [flipped, toggleFlip] = useState(false);

  const { card, withQuantityIndicator = false, quantity } = props;

  let visibleFace = card.image_uris ? card.image_uris.large : card.card_faces[0].image_uris.large;
  let buttonAction = null;
  let buttonText = null;

  switch (card.layout) {
    case 'flip':
      visibleFace = card.image_uris.large;
      buttonAction = () => toggleFlip(!flipped);
      buttonText = 'Flip';
      break;

    case 'transform':
      visibleFace = transformed ? card.card_faces[1].image_uris.large : card.card_faces[0].image_uris.large;
      buttonAction = () => toggleTransform(!transformed);
      buttonText = 'Transform';
      break;

    default:
      break;
  }

  return (
    <div className={classes.Card} style={{ border: '1px solid black', maxWidth: '100%' }}>
      <img
        src={visibleFace}
        alt={card.name}
        onClick={props.onClick}
        style={{
          display: 'block',
          transform: flipped ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
          borderRadius: '4.2%',
          width: '100%'
        }}
      />

      {withQuantityIndicator && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type='button'
            disabled={quantity === 0}
            onClick={() => props.updateCardListHandler(card, quantity - 1)}
            style={{ flexGrow: '1', flexBasis: '0' }}>
            -
          </button>
          <p style={{ flexGrow: '1', flexBasis: '0', textAlign: 'center' }}>{quantity}</p>
          <button
            type='button'
            disabled={quantity === 4}
            onClick={() => props.updateCardListHandler(card, quantity + 1)}
            style={{ flexGrow: '1', flexBasis: '0' }}>
            +
          </button>
        </div>
      )}

      {buttonAction !== null && (
        <button type='button' onClick={buttonAction}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
