import React, { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

import { StyledSearch } from './styles';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <StyledSearch>
      <SearchForm setSearchResults={setSearchResults} />
      <SearchResults searchResults={searchResults} />
    </StyledSearch>
  );
};

export default Search;
