import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { SEARCH_CARDS, GET_USER_DECKS } from './graphql';

import SidebarSearchResult from './SidebarSearchResult/SidebarSearchResult';

import classes from './DeckManagerSidebar.module.scss';

const AddCardSidebar = props => {
  const {
    deck: { cardList, commander, format }
  } = props;

  const client = useApolloClient();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedList, setSelectedList] = useState('mainDeck');
  const [nameSearch, setNameSearch] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);

  const searchCards = async submitEvent => {
    submitEvent.preventDefault();
    setLoadingResults(true);

    const { data, errors } = await client.query({
      query: SEARCH_CARDS,
      skip: nameSearch.length < 3,
      variables: {
        searchParams: {
          name: nameSearch,
          ...defaultParams
        }
      }
    });
    if (errors) {
      errors.forEach(error => {
        setLoadingResults(false);
        toast.error(error.message);
      });
    } else {
      setSearchResults(data.searchCards.cards);
      setLoadingResults(false);
    }
  };

  const GetUserDecksQueryResponse = useQuery(GET_USER_DECKS);

  const isCardSelectable = resultCard => {
    const maxCardAllowance = format === 'commander' ? 1 : 4;

    const matchedCard = cardList.findIndex(({ card }) => {
      return card.scryfall_id === resultCard.scryfall_id;
    });

    if (format === 'commander' && resultCard.scryfall_id === commander.scryfall_id) {
      return false;
    }

    if (format === 'commander' && selectedList === 'sideboard') {
      return false;
    }

    if (matchedCard === -1) {
      return true;
    }

    const { mainDeckCount, sideboardCount } = cardList[matchedCard];
    if (mainDeckCount + sideboardCount >= maxCardAllowance) {
      return false;
    }

    return true;
  };

  const addCardHandler = card => {
    props.updateCardListHandler(props.deck, selectedList, 'add', card);
  };

  const defaultParams = {
    formats: [
      {
        format: format,
        legality: 'legal'
      }
    ]
  };

  if (format === 'commander') {
    defaultParams.commander = commander.color_identity;
  }

  return (
    <div className={classes.DeckManagerSidebar}>
      <div>
        <h1>Quick Search</h1>
        {format !== 'commander' && (
          <React.Fragment>
            <button type='button' disabled={selectedList === 'mainDeck'} onClick={() => setSelectedList('mainDeck')}>
              Main Deck
            </button>
            <button type='button' disabled={selectedList === 'sideboard'} onClick={() => setSelectedList('sideboard')}>
              Sideboard
            </button>
          </React.Fragment>
        )}
        <div>
          {searchResults.length !== 0 && (
            <React.Fragment>
              {searchResults.map(result => {
                return (
                  <SidebarSearchResult
                    key={result.scryfall_id}
                    card={result}
                    isSelectable={isCardSelectable(result)}
                    addCardHandler={addCardHandler}
                  />
                );
              })}
              <button
                type='button'
                onClick={() => {
                  setSearchResults([]);
                }}>
                Clear Results
              </button>
            </React.Fragment>
          )}
        </div>
        <form onSubmit={searchCards}>
          <input
            type='text'
            placeholder='Card Name...'
            value={nameSearch}
            onChange={e => setNameSearch(e.target.value)}
          />

          <button type='submit' disabled={nameSearch.length < 3}>
            {loadingResults ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
      <hr />
      <div>
        {GetUserDecksQueryResponse.loading && <h1>Loading other decks...</h1>}
        {GetUserDecksQueryResponse.data && (
          <div>
            {GetUserDecksQueryResponse.data.getCurrentUser.decks.map(deck => {
              return (
                <Link key={deck.id} to={`/decks/${deck.id}`}>
                  <p key={deck.id}>{deck.name}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCardSidebar;
