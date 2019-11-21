import styled from "styled-components";

export const StyledDeckInspector = styled.main`
  flex-grow: 3;
  flex-basis: 0;
  margin-left: 1rem;
  height: 100%;
  overflow: scroll;
`;

export const DeckDetails = styled.div`
  h2 {
    width: fit-content;
    margin: 2rem 0 1rem;
    padding: 0.5rem 2rem 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1rem;

    color: ${props => props.theme.colors.deepBlue};
    font-weight: ${props => props.theme.fonts.weights.bold};
    text-align: center;
  }
`;

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0;
`;

export const StyledCardListPlaceholder = styled.div`
  padding: 5rem;
  text-align: center;
  border: 5px dashed lightgrey;
  h1 {
    font-size: ${props => props.theme.fonts.sizes.extraLarge}};

    svg {
      margin-right: 0.5rem;
    }
  }
`;
