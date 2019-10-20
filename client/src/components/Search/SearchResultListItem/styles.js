import styled from 'styled-components';

export const StyledSearchResultListItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-bottom: 2px solid lightgrey;
  background-color: white;
`;

export const ListModeCardDetails = styled.div`
  flex-grow: 7;
  width: 70%;
  flex-basis: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    flex-grow: 1;
    flex-basis: 0;
    margin: 0 1.5rem 0 0;
  }

  .ListModeName {
    flex-grow: 2;
    font-weight: ${props => props.theme.fonts.weights.bold};
  }

  .ListModeTypeLine {
    flex-grow: 2;
  }

  .ListModeRarity {
    text-align: right;
  }
`;

export const SearchResultCardControlsWrapper = styled.div`
  display: flex;
  flex-grow: 3;
  flex-basis: 0;
  flex-wrap: wrap;
  justify-content: flex-end;

  & > div {
    width: 100%;
  }
  align-self: center;
`;
