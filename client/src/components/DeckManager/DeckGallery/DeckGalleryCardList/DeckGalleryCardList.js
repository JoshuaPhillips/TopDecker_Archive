import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CARDS_DETAILS, DELETE_CARD } from './graphql';
import { GET_DECK_DETAILS } from '../../graphql';

import Card from '../../../Card/Card';

const DeckGalleryCardList = props => {
  const { cardList, deleteMode } = props;
  const [populatedCardList, setPopulatedCardList] = useState([]);

  const GetCardsDetailsQueryResponse = useQuery(GET_CARDS_DETAILS, {
    skip: cardList.length === 0,
    variables: { cardList },
    onCompleted() {
      const { getCardsByScryfallIds: newCardList } = GetCardsDetailsQueryResponse.data;

      setPopulatedCardList(
        newCardList.sort((first, second) => {
          return first.card.name < second.card.name ? -1 : first.card.name > second.card.name ? 1 : 0;
        })
      );
    }
  });

  const [DeleteCardMutation] = useMutation(DELETE_CARD, {
    variables: { deckId: props.currentDeckId },
    refetchQueries: [
      {
        query: GET_DECK_DETAILS,
        variables: {
          deckId: props.currentDeckId
        }
      }
    ]
  });

  if (GetCardsDetailsQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {populatedCardList.length !== 0 &&
        populatedCardList.map(card => {
          return (
            <div key={card.card.scryfall_id} style={{ width: 'calc(25% - 1rem)', maxWidth: '20vw', margin: '.5rem' }}>
              <Card card={card.card} quantity={card.quantity} withQuantityIndicator />
              {deleteMode && (
                <button
                  type='button'
                  onClick={() =>
                    DeleteCardMutation({
                      variables: { scryfallId: card.card.scryfall_id }
                    })
                  }>
                  Delete
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default DeckGalleryCardList;
