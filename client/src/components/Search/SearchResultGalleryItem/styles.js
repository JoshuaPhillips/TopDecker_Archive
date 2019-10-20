import styled from 'styled-components';

export const StyledSearchResultGalleryItem = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-radius: 4.2% 4.2% 5px 5px;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;

  width: calc((100% - 1rem) / 3);

  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export const SearchResultCardControlsWrapper = styled.div`
  margin: 0.5rem 0;
`;
