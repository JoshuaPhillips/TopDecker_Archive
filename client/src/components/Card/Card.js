import React, { useState } from 'react';
import ReactImage from 'react-image';
import Spinner from '../Spinner/Spinner';

import { StyledCard } from './styles';

const Card = props => {
  const [transformed, toggleTransform] = useState(false);
  const [flipped, toggleFlip] = useState(false);

  const { card } = props;

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
    <StyledCard>
      <ReactImage
        src={visibleFace}
        loader={<Spinner />}
        style={{
          display: 'block',
          transform: flipped ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
          borderRadius: '4.2%',
          width: '100%'
        }}
      />

      {buttonAction !== null && (
        <button type='button' onClick={buttonAction}>
          {buttonText}
        </button>
      )}
    </StyledCard>
  );
};

export default Card;
