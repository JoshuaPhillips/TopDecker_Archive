import React, { useState } from 'react';

import classes from './Card.module.scss';

const Card = props => {
  const [transformed, toggleTransform] = useState(false);
  const [flipped, toggleFlip] = useState(false);

  // extract card details under the alias card
  const { card, quantity = 1, withQuantityIndicator = false } = props;

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
        <div style={{ display: 'flex' }}>
          {[...Array(quantity)].map((_, n) => (
            <div
              key={`${card.scryfall_id}_${n}`}
              style={{ border: '1px solid black', backgroundColor: 'blue', width: '25%', height: '30px' }}
            />
          ))}
          {[...Array(4 - quantity)].map((_, n) => (
            <div
              key={`${card.scryfall_id}_${n}`}
              style={{ border: '1px solid black', backgroundColor: 'red', width: '25%', height: '30px' }}
            />
          ))}
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
