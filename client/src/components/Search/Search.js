import React, { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

import { StyledSearch } from './styles';

const Search = props => {
  const { deck } = props.location.state || null;
  const [searchResults, setSearchResults] = useState([]);

  return (
    <StyledSearch>
      <SearchForm setSearchResults={setSearchResults} />
      <SearchResults searchResults={searchResults} selectedDeck={deck} />
    </StyledSearch>
  );
};

export default Search;
