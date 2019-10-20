import styled from 'styled-components';

export const StyledSearchResultCardControls = styled.div`
  padding-top: 0.25rem;
  text-align: center;
`;

export const SearchResultCardControlGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
    width: 33.33%;
    font-weight: ${props => props.theme.fonts.weights.bold};
  }

  button {
    border: 0;
    outline: 0;
    background-color: transparent;

    &:disabled {
      color: lightgrey;
    }
  }
`;

export const SearchResultCardQuantityContainer = styled.div`
  p {
  }
`;
