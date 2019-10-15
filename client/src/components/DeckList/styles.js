import styled from 'styled-components';

export const DeckListContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
  padding: 3rem;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 7px #c7c7c7;
  width: 50%;
  border-radius: 5px;
`;

export const DeckList = styled.div`
  margin-bottom: 2rem;
  width: 100%;

  ButtonGroup {
    color: red;
  }
`;
