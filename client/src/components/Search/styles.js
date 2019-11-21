import styled from "styled-components";

export const StyledSearch = styled.main`
  display: flex;
  padding: 4rem 2rem 1rem;
  height: 100vh;
`;

export const SearchFormWrapper = styled.div`
  width: 40%;
  padding: 1rem;
  height: 100%;
  overflow-y: scroll;
  margin-right: 0.5rem;
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-radius: 5px;
  background-color: white;
`;

export const CardColorSelectionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const CardColorSelectionButton = styled.button.attrs(() => ({
  type: "button"
}))`
    color: ${props => props.theme.colors.primary} 
    border: ${props =>
      props.selected
        ? `2px solid ${props.theme.colors.primary}`
        : `2px solid lightgrey`};
    box-shadow: ${props => (props.selected ? `1px 3px 8px lightgrey` : "none")}
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0 0.5rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    width: calc((100% - 1rem) / 3);

    :nth-child(3n) {
      margin-right: 0;
    }

    i {
      margin-right: 0.5rem;
      ${props => !props.selected && `filter: grayscale(100%)`};
      transition: .2s all ease-in-out;
    }

    transition: .2s all ease-in-out;
  }
  `;

export const NumberInputWithSelectComparison = styled.div`
  display: flex;
  justify-content: space-between;

  select,
  input {
    outline: none;
  }

  select {
    flex-grow: 1;
    margin: 0 0.5rem 0 0;
  }

  input {
    padding: 0.5rem;
    width: 20%;
  }
`;

export const SearchFormRarityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

export const SearchFormSubmitButtonWrapper = styled.div`
  margin-left: 1.5rem;
`;

export const SearchResultsWrapper = styled.div`
  width: 60%;
  padding: 1rem;
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-radius: 5px;
  background-color: white;
  overflow: scroll;
`;

export const SearchResultsToolbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
`;

export const SearchResultsCardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

export const SearchResultItemWrapper = styled.div`
  display: flex;

  width: calc((100% - 1rem) / 3);
  margin: 0 0.5rem 0.5rem 0;

  &:nth-child(3n) {
    margin-right: 0;
  }
`;
