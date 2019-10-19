import styled from 'styled-components';

export const Form = styled.form``;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px dashed lightgrey;
  padding: 1rem;

  &:first-of-type {
    border-top: 0;
  }
`;

export const FormRowTitle = styled.div`
  width: 30%;
  padding: 0.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

export const FormRowContent = styled.div`
  width: 70%;
`;

export const TextInput = styled.input`
  width: 100%;
  outline: none;
  letter-spacing: 0.1rem;
  border-top: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
  border-left: 5px solid ${props => props.theme.colors.primary};
  padding: 0.5rem;
  padding-left: 1rem;
  transition: all 0.2s ease-in-out;

  &:read-only {
    color: lightgrey;
  }
`;

export const NumberInput = styled.input`
  appearance: none;
  padding: 0.5rem;
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-right: 2px solid lightgrey;

  &::-webkit-inner-spin-button {
    appearance: none;
  }
`;

export const StyledSelect = styled.select`
  outline: 0;
  letter-spacing: 0.1rem;
  cursor: pointer;
  appearance: none;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0;
  border-bottom: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
  border-left: 5px solid ${props => props.theme.colors.primary};
`;

export const Select = styled.select``;
