import styled from 'styled-components';

export const StyledDeckInspector = styled.main`
  flex-grow: 3;
  flex-basis: 0;
  margin-left: 2rem;
`;

export const DeckDetails = styled.div`
  max-height: 100%;
  overflow-y: scroll;

  h1 {
    margin: 1rem 0;
  }
`;

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 2rem;
`;
