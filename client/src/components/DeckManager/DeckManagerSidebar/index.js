import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { SEARCH_CARDS, GET_USER_DECKS } from './graphql';

import SidebarSearchResult from './SidebarSearchResult';
import Spinner from '../../Spinner/Spinner';

import { StyledDeckManagerSidebar, QuickSearchContainer, OtherDecksContainer } from './styles';
import { SectionHeader } from '../../../shared/Headers';
import { Button } from '../../../shared/Buttons';
import { ModeToggleContainer } from '../../../shared/ModeToggles';
import { TextInput } from '../../../shared/Forms';

import { capitalise } from '../../../utils/capitalise';

const DeckManagerSidebar = props => {
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
    <StyledDeckManagerSidebar>
      <QuickSearchContainer>
        <div className='QuickSearchHeaderContainer'>
          <SectionHeader>Quick Search</SectionHeader>
          {format !== 'commander' && (
            <ModeToggleContainer>
              <button type='button' disabled={selectedList === 'mainDeck'} onClick={() => setSelectedList('mainDeck')}>
                Main Deck
              </button>
              <button
                type='button'
                disabled={selectedList === 'sideboard'}
                onClick={() => setSelectedList('sideboard')}>
                Sideboard
              </button>
            </ModeToggleContainer>
          )}
        </div>
        <div className='QuickSearchResultsContainer'>
          {searchResults.length === 0 ? (
            <h1>Search for a card name below.</h1>
          ) : (
            <React.Fragment>
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
                  </React.Fragment>
                )
              )}
            </React.Fragment>
          )}
        </div>
        <div className='QuickSearchFormContainer'>
          <form onSubmit={searchCards}>
            <TextInput
              type='text'
              placeholder='Card Name...'
              value={nameSearch}
              onChange={e => setNameSearch(e.target.value)}
            />

            <Button inverted type='submit' disabled={nameSearch.length < 3}>
              {loadingResults ? 'Searching...' : 'Search'}
            </Button>
            {searchResults.length !== 0 && (
              <Button
                type='button'
                onClick={() => {
                  setNameSearch('');
                  setSearchResults([]);
                }}>
                Clear Results
              </Button>
            )}
          </form>
        </div>
      </QuickSearchContainer>

      <OtherDecksContainer>
        {GetUserDecksQueryResponse.loading && <Spinner />}
        {GetUserDecksQueryResponse.data && (
          <div>
            {GetUserDecksQueryResponse.data.getCurrentUser.decks.map(deck => {
              return (
                <Link key={deck.id} to={`/decks/${deck.id}`}>
                  <p key={deck.id}>
                    {deck.name} ({capitalise(deck.format)})
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </OtherDecksContainer>
    </StyledDeckManagerSidebar>
  );
};

export default DeckManagerSidebar;
