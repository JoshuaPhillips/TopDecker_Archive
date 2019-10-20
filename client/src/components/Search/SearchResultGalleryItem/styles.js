import styled from 'styled-components';

export const StyledSearchResultGalleryItem = styled.div`
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  background-color: white;
  border-radius: 4.2% 4.2% 5px 5px;
  margin: 0.5rem 0.5rem 0 0;

  width: calc((100% - 1rem) / 3);

  &:nth-child(3n) {
    margin-right: 0;
  }
`;
