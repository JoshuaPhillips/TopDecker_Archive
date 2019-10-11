import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { SEARCH_CARDS, GET_USER_DECKS } from './graphql';

import SidebarSearchResult from './SidebarSearchResult/SidebarSearchResult';
import Spinner from '../../Spinner/Spinner';

import classes from './DeckManagerSidebar.module.scss';

const AddCardSidebar = props => {
  const {
    deck: { commander, format },
    updateCardListHandler
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
          {loadingResults ? (
            <Spinner />
          ) : (
            searchResults.length !== 0 && (
              <React.Fragment>
                {searchResults.map(result => {
                  return (
                    <SidebarSearchResult
                      key={result.scryfall_id}
                      deck={props.deck}
                      card={result}
                      list={selectedList}
                      addCardHandler={updateCardListHandler}
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
            )
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
        {GetUserDecksQueryResponse.loading && <Spinner />}
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
