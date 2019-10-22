import React, { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

import { StyledSearch } from './styles';

const Search = props => {
  const [searchResults, setSearchResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  let deck = null;
  if (props.location.state) {
    deck = props.location.state.deck;
  }

  return (
    <StyledSearch>
      <SearchForm
        setSearchResults={setSearchResults}
        loadingResults={loadingResults}
        setLoadingResults={setLoadingResults}
      />
      <SearchResults searchResults={searchResults} selectedDeck={deck} searchingCards={loadingResults} />
    </StyledSearch>
  );
};

export default Search;
