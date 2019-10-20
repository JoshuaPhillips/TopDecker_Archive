import styled from 'styled-components';

export const StyledSearchResultCardControlsContainer = styled.div`
  padding-top: 0.25rem;
  text-align: center;
`;

export const SearchResultCardControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0.25rem;

  div {
    width: 33.33%;
    text-align: center;
  }

  button {
    border: 0;
    outline: 0;
    background-color: transparent;
    font-size: 1rem;
  }
`;
