import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_CARD } from './graphql';
import { GET_DECK_DETAILS } from '../../graphql';

import Card from '../../../Card/Card';

const DeckGalleryCardList = props => {
  const { cardList, deleteMode } = props;

  const [DeleteCardMutation] = useMutation(DELETE_CARD, {
    variables: { deckId: props.currentDeckId },
    refetchQueries: [
      {
        query: GET_DECK_DETAILS,
        variables: { deckId: props.currentDeckId }
      }
    ]
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {cardList.length !== 0 &&
        cardList.map(card => {
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
