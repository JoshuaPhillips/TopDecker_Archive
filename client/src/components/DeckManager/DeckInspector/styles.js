import styled from 'styled-components';

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
    padding: 0.5rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;

    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
    border-radius: 0 10px 10px 0;
    font-weight: ${props => props.theme.fonts.weights.bold};
    text-align: center;
  }
`;

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0;
`;
