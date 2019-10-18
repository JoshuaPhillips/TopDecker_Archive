import styled from 'styled-components';

export const StyledGalleryModeContainer = styled.div`
  max-height: 100%;
  overflow-y: scroll;

  h1 {
    margin: 1rem 0;
  }
`;

export const GalleryModeCardListContainer = styled.div`
  padding: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledGalleryModeCardItem = styled.div`
  width: calc(20% - 0.5rem);
  margin: 0.25rem 0.25rem 1rem;
  box-sizing: border-box;
  border-radius: 4.2% 4.2% 5px 5px;
`;
