import styled from "styled-components";

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
  width: 25%;
  padding: 0.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

export const FormRowContent = styled.div`
  width: 75%;
`;

export const TextInput = styled.input`
  width: 100%;
  outline: none;
  letter-spacing: 0.1rem;
  border: ${props => props.theme.borders.thick};

  padding: 0.5rem;
  padding-left: 1rem;
  transition: all 0.2s ease-in-out;

  &:read-only,
  &:read-only:focus {
    color: lightgrey;
    box-shadow: none;
    cursor: not-allowed;
    border: ${props => props.theme.borders.thick};
    border-left: ${props => props.theme.borders.thick};
  }

  &:focus {
    box-shadow: 3px 3px 8px lightgrey;
    border: 2px solid ${props => props.theme.colors.deepBlue};
    border-left: 5px solid ${props => props.theme.colors.deepBlue};
  }
`;

export const NumberInput = styled.input`
  appearance: none;
  padding: 0.5rem;
  border: ${props => props.theme.borders.standard}
  border-bottom: ${props => props.theme.borders.thick};
  border-right: ${props => props.theme.borders.thick};

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
  border-bottom: ${props => props.theme.borders.thick};
  border-right: ${props => props.theme.borders.thick};
  border-left: 5px solid ${props => props.theme.colors.deepBlue};
`;

export const Select = styled.select``;
