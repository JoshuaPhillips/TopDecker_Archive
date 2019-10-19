import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { SEARCH_CARDS, GET_USER_DECKS } from './graphql';

import SidebarSearchResult from './SidebarSearchResult';
import Spinner from '../../Spinner/Spinner';
import Card from '../../Card/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faEraser } from '@fortawesome/free-solid-svg-icons';

import { capitalise } from '../../../utils/capitalise';

import {
  StyledDeckManagerSidebar,
  QuickSearchContainer,
  QuickSearchListSelectionWrapper,
  OtherDecksContainer,
  QuickSearchResultsContainer,
  QuickSearchFormContainer,
  QuickSearchFormButtonsWrapper
} from './styles';
import { SectionHeader } from '../../../shared/Headers';
import { Button } from '../../../shared/Buttons';
import { TextInput } from '../../../shared/Forms';

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
  const [selectedResult, setSelectedResult] = useState(null);

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
        <div>
          <SectionHeader>Quick Search</SectionHeader>
          {format !== 'commander' && (
            <QuickSearchListSelectionWrapper>
              <button type='button' disabled={selectedList === 'mainDeck'} onClick={() => setSelectedList('mainDeck')}>
                Main Deck
              </button>
              <button
                type='button'
                disabled={selectedList === 'sideboard'}
                onClick={() => setSelectedList('sideboard')}>
                Sideboard
              </button>
            </QuickSearchListSelectionWrapper>
          )}
        </div>
        <QuickSearchResultsContainer>
          {selectedResult ? (
            <Card card={selectedResult} />
          ) : searchResults.length === 0 ? (
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
                          selectResult={setSelectedResult}
                        />
                      );
                    })}
                  </React.Fragment>
                )
              )}
            </React.Fragment>
          )}
        </QuickSearchResultsContainer>
        <QuickSearchFormContainer>
          <form onSubmit={searchCards}>
            <TextInput
              type='text'
              placeholder='Card Name...'
              value={nameSearch}
              onChange={e => setNameSearch(e.target.value)}
            />

            <QuickSearchFormButtonsWrapper>
              <Button inverted type='submit' disabled={nameSearch.length < 3}>
                <FontAwesomeIcon icon={faSearch} fixedWidth />
                {loadingResults ? 'Searching...' : 'Search'}
              </Button>

              {searchResults.length !== 0 &&
                (selectedResult ? (
                  <Button type='button' onClick={() => setSelectedResult(null)}>
                    <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                    Back
                  </Button>
                ) : (
                  <Button
                    type='button'
                    onClick={() => {
                      setNameSearch('');
                      setSelectedResult(null);
                      setSearchResults([]);
                    }}>
                    <FontAwesomeIcon icon={faEraser} fixedWidth />
                    Clear
                  </Button>
                ))}
            </QuickSearchFormButtonsWrapper>
          </form>
        </QuickSearchFormContainer>
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
