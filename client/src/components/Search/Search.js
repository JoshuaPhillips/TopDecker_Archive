import React, { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

import { StyledSearch } from './styles';

const Search = props => {
  const [searchResults, setSearchResults] = useState([]);

  let deck = null;
  if (props.location.state) {
    deck = props.location.state.deck;
  }

  return (
    <StyledSearch>
      <SearchForm setSearchResults={setSearchResults} />
      <SearchResults searchResults={searchResults} selectedDeck={deck} />
    </StyledSearch>
  );
};

export default Search;
