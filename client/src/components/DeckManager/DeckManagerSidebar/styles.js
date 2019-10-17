import styled from 'styled-components';

export const StyledDeckManagerSidebar = styled.aside`
  width: 30%;
  max-width: 350px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    flex-basis: 0;
  }
`;

export const QuickSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 8;

  .QuickSearchResultsContainer {
    flex-grow: 1;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    border: 2px dashed lightgrey;
    overflow-y: scroll;
    margin-bottom: 1rem;
    padding: 0.5rem 0;

    h1 {
      font-weight: ${props => props.theme.fonts.weights.bold};
      font-size: ${props => props.theme.fonts.sizes.extraLarge};
      text-align: center;
      margin-top: 10rem;
    }
  }

  .QuickSearchFormContainer {
    input {
      margin-bottom: 0.5rem;
    }
  }
`;

export const OtherDecksContainer = styled.div`
  flex-grow: 2;
  border-top: 2px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 0;
`;
