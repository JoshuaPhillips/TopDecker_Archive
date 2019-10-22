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
    margin: 1rem 0;
    padding: 0.5rem;
    border: 1px solid lightgrey;
    border-bottom: 2px solid lightgrey;
    background-color: white;
    width: 25%;
  }
`;

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0;
`;
