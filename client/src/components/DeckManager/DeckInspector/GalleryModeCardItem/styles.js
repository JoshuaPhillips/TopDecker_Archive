import styled from "styled-components";

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
  border: ${props => props.theme.borders.standard}
  border-bottom: ${props => props.theme.borders.thick};
  background-color: white;
  border-radius: 4.2% 4.2% 5px 5px;
  margin: 0.5rem 0.5rem 0 0;

  width: calc((100% - 0.5rem) / 2);

  :nth-child(2n) {
    margin-right: 0;
  }

  @media (min-width: 1000px) {
    width: calc((100% - 1rem) / 3);

    :nth-child(2n) {
      margin-right: 0.5rem;
    }

    :nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1200px) {
    width: calc((100% - 1.5rem) / 4);

    :nth-child(3n) {
      margin-right: 0.5rem;
    }

    :nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1600px) {
    width: calc((100% - 2rem) / 5);

    :nth-child(4n) {
      margin-right: 0.5rem;
    }

    :nth-child(5n) {
      margin-right: 0;
    }
  }
`;
