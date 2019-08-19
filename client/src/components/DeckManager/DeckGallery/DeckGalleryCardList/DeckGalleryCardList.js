import React from 'react';

import Card from '../../../Card/Card';

const DeckGalleryCardList = props => {
  const {
    deck: { cardList, format },
    deleteMode
  } = props;

  const mainDeckList = cardList.filter(card => {
    return card.mainDeckCount !== 0;
  });

  const sideboardList = cardList.filter(card => {
    return card.sideboardCount !== 0;
  });

  const maxMainDeckCards = format === 'commander' ? 100 : 60;

  let mainDeckTotal = 0;
  let sideboardTotal = 0;

  mainDeckList.map(({ mainDeckCount }) => {
    return (mainDeckTotal += mainDeckCount);
  });

  sideboardList.map(({ sideboardCount }) => {
    return (sideboardTotal += sideboardCount);
  });

  console.log(sideboardTotal, mainDeckTotal);

  return (
    <React.Fragment>
      <h1>Main Deck</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {mainDeckList.length === 0 ? (
          <h1>No Cards Found</h1>
        ) : (
          mainDeckList.map(({ card, mainDeckCount, sideboardCount }) => {
            return (
              <div key={card.scryfall_id} style={{ width: 'calc(25% - 1rem)', maxWidth: '20vw', margin: '.5rem' }}>
                <Card card={card} />
                {format !== 'commander' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type='button'
                      disabled={mainDeckCount === 0}
                      onClick={() =>
                        props.updateCardListHandler(card, {
                          mainDeckCount: mainDeckCount - 1,
                          sideboardCount: sideboardCount
                        })
                      }
                      style={{ flexGrow: '1', flexBasis: '0' }}>
                      -
                    </button>
                    <p style={{ flexGrow: '1', flexBasis: '0', textAlign: 'center' }}>{mainDeckCount}</p>
                    <button
                      type='button'
                      disabled={mainDeckCount + sideboardCount === 4 || mainDeckTotal === maxMainDeckCards}
                      onClick={() =>
                        props.updateCardListHandler(card, {
                          mainDeckCount: mainDeckCount + 1,
                          sideboardCount: sideboardCount
                        })
                      }
                      style={{ flexGrow: '1', flexBasis: '0' }}>
                      +
                    </button>
                  </div>
                )}

                <button
                  type='button'
                  onClick={() =>
                    props.updateCardListHandler(card, {
                      mainDeckCount: mainDeckCount - 1,
                      sideboardCount: sideboardCount + 1
                    })
                  }>
                  Transfer to Sideboard
                </button>

                {deleteMode && (
                  <button
                    type='button'
                    onClick={() => props.updateCardListHandler(card, { mainDeckCount: 0, sideboardCount: 0 })}>
                    Delete
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
      <hr />
      <h1>Sideboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sideboardList.length === 0 ? (
          <h1>No Cards Found</h1>
        ) : (
          sideboardList.map(({ card, mainDeckCount, sideboardCount }) => {
            return (
              <div key={card.scryfall_id} style={{ width: 'calc(25% - 1rem)', maxWidth: '20vw', margin: '.5rem' }}>
                <Card card={card} />
                {format !== 'commander' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type='button'
                      disabled={sideboardCount === 0}
                      onClick={() =>
                        props.updateCardListHandler(card, {
                          mainDeckCount: mainDeckCount,
                          sideboardCount: sideboardCount - 1
                        })
                      }
                      style={{ flexGrow: '1', flexBasis: '0' }}>
                      -
                    </button>
                    <p style={{ flexGrow: '1', flexBasis: '0', textAlign: 'center' }}>{sideboardCount}</p>
                    <button
                      type='button'
                      disabled={mainDeckCount + sideboardCount === 4 || sideboardTotal === 15}
                      onClick={() =>
                        props.updateCardListHandler(card, {
                          mainDeckCount: mainDeckCount,
                          sideboardCount: sideboardCount + 1
                        })
                      }
                      style={{ flexGrow: '1', flexBasis: '0' }}>
                      +
                    </button>
                  </div>
                )}
                <button
                  type='button'
                  onClick={() =>
                    props.updateCardListHandler(card, {
                      mainDeckCount: mainDeckCount + 1,
                      sideboardCount: sideboardCount - 1
                    })
                  }>
                  Transfer to Main Deck
                </button>

                {deleteMode && (
                  <button
                    type='button'
                    onClick={() => props.updateCardListHandler(card, { mainDeckCount: 0, sideboardCount: 0 })}>
                    Delete
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </React.Fragment>
  );
};

export default DeckGalleryCardList;
