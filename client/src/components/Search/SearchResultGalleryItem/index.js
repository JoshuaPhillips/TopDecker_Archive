import React from 'react';

import SearchResultCardControls from '../SearchResultCardControls';
import Card from '../../Card/Card';

import { StyledSearchResultGalleryItem } from './styles';

const SearchResultGalleryItem = props => {
  const { deck, result, updateCardListHandler } = props;

  return (
    <StyledSearchResultGalleryItem>
      <Card card={result} />
      <SearchResultCardControls deck={deck} updateCardList={updateCardListHandler} result={result} />
    </StyledSearchResultGalleryItem>
  );
};

export default SearchResultGalleryItem;
