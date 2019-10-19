import styled from 'styled-components';

export const Form = styled.form`
  width: 60%;
  margin: 0 auto 2rem;
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed lightgrey;
  padding: 1rem;

  &:last-of-type {
    border-bottom: 0;
  }
`;

export const FormRowTitle = styled.div`
  width: 30%;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

export const FormRowContent = styled.div`
  width: 70%;
`;

export const TextInput = styled.input`
  width: 100%;
  outline: none;
  letter-spacing: 0.1rem;
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
  border-left: 5px solid ${props => props.theme.colors.primary};
  padding: 0.5rem;
  padding-left: 1rem;
`;

export const CardColorSelectionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const CardColorSelectionButton = styled.button.attrs(() => ({
  type: 'button'
}))`
    color: ${props => props.theme.colors.primary} 
    
    border: ${props => (props.selected ? `2px solid ${props.theme.colors.primary}` : `2px solid lightgrey`)};
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
    }
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
    margin-right: 0.5rem;
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

export const StyledSelect = styled.select`
  outline: 0;
  letter-spacing: 0.1rem;
  margin: 0.5rem 0;
`;

export const Select = styled.select`
  border: 2px solid ${props => props.theme.colors.primary};
  outline: 0;
  letter-spacing: 0.1rem;
`;
