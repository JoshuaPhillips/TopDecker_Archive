import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Card from '../Card/Card';

const GET_CARD_DETAILS = gql`
  query GetCardDetails {
    getCardByScryfallId(scryfallId: "9f25e1cf-eeb4-458d-8fb2-b3a2f86bdd54") {
      name
      scryfall_id
      layout
      card_faces {
        name
        image_uris {
          large
        }
      }
      image_uris {
        large
      }
    }
  }
`;

const Sandbox = props => {
  const GetCardDetailsQueryResponse = useQuery(GET_CARD_DETAILS);

  if (GetCardDetailsQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }
  const card = GetCardDetailsQueryResponse.data.getCardByScryfallId;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Card card={card} withTransformButton withQuantityIndicator />
    </div>
  );
};

export default Sandbox;
