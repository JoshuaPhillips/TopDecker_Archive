import React from 'react';
import Card from '../../Card/Card';

import { StyledSearchResultGalleryItem } from './styles';

const SearchResultGalleryItem = props => {
  const { result } = props;

  return (
    <StyledSearchResultGalleryItem>
      <Card card={result} />
    </StyledSearchResultGalleryItem>
  );
};

export default SearchResultGalleryItem;
