import React from 'react';
import Card from '../../Card/Card';

import { StyledSearchResultGalleryItem, SearchResultCardControlsWrapper } from './styles';
import SearchResultCardControls from '../SearchResultCardControls';

const SearchResultGalleryItem = props => {
  const { deck, result, updateCardListHandler } = props;

  return (
    <StyledSearchResultGalleryItem>
      <Card card={result} />
      <SearchResultCardControlsWrapper>
        <SearchResultCardControls deck={deck} result={result} updateCardList={updateCardListHandler} />
      </SearchResultCardControlsWrapper>
    </StyledSearchResultGalleryItem>
  );
};

export default SearchResultGalleryItem;
