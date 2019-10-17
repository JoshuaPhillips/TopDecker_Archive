import styled from 'styled-components';

export const StyledDeckManagerSidebar = styled.aside`
  width: 30%;
  max-width: 300px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const QuickSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 85%;

  .QuickSearchHeaderContainer {
    h1 {
      padding-bottom: 1.65rem; // to line up with the header of the deck inspector
    }
  }

  .QuickSearchResultsContainer {
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    border: 2px dashed lightgrey;
    overflow-y: scroll;
    margin-bottom: 1rem;

    h1 {
      font-weight: ${props => props.theme.fonts.weights.bold};
      font-size: ${props => props.theme.fonts.sizes.extraLarge};
      text-align: center;
      padding: 0.5rem 0;
    }
  }

  .QuickSearchFormContainer {
    input {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;

export const OtherDecksContainer = styled.div`
  border-top: 2px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 0;
  min-height: 15%;

  p {
    margin-bottom: 0.25rem;
  }
`;
