import styled from 'styled-components';

export const StyledGalleryModeContainer = styled.div`
  max-height: 100%;
  overflow-y: scroll;

  h1 {
    margin: 1rem 0;
  }
`;

export const GalleryModeCardListContainer = styled.div`
  padding: 1rem 0 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledGalleryModeCardItem = styled.div`
  width: calc((100% - 1.5rem) / 4);
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  background-color: white;
  border-radius: 4.2% 4.2% 5px 5px;
  margin: 0.5rem 0.5rem 0 0;

  :nth-child(4n) {
    margin-right: 0;
  }
`;
