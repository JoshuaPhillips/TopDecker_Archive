import styled from "styled-components";
import { ModeToggleContainer } from "../../../shared/ModeToggles";

export const StyledDeckManagerSidebar = styled.aside`
  width: 30%;
  max-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${props => props.theme.borders.standard};
  background-color: white;
  padding: 0.5rem 1rem;
  border: ${props => props.theme.borders.standard}
  border-bottom: ${props => props.theme.borders.thick};
`;

export const QuickSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
`;

export const QuickSearchListSelectionWrapper = styled(ModeToggleContainer)`
  margin: 1rem 0;
`;

export const QuickSearchResultsContainer = styled.div`
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
`;

export const QuickSearchFormContainer = styled.div`
  margin-top: auto;
  input {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

export const QuickSearchFormButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  transition: color 0.2s ease-in-out;

  button {
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
    width: calc(50% - 0.25rem);
  }
`;

export const OtherDecksContainer = styled.div`
  height: 25%;
  border-top: 2px solid ${props => props.theme.colors.deepBlue};

  padding: 0.5rem 0;
  min-height: 15%;
  overflow-y: scroll;

  p {
    padding: 0.5rem 0 0.5rem 0.5rem;
    border-bottom: 1px dotted lightgrey;
  }
`;
