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
  flex-grow: 1;
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

export const Select = styled.select`
  border: 2px solid ${props => props.theme.colors.primary};
  outline: 0;
  letter-spacing: 0.1rem;
`;
