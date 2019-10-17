import styled from 'styled-components';

export const Form = styled.form`
  width: 60%;
  margin: 0 auto 2rem;
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

export const FormRowLabel = styled.div`
  width: 30%;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

export const FormRowContent = styled.div`
  width: 70%;
`;

export const TextInputWithLabel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;

  label {
    width: 30%;

    font-weight: ${props => props.theme.fonts.weights.bold};
  }

  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='url'] {
    width: 70%;
    outline: none;
    letter-spacing: 0.1rem;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    padding: 0.5rem;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  outline: none;
  letter-spacing: 0.1rem;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  padding: 0.5rem;
`;

export const Select = styled.select`
  border: 2px solid ${props => props.theme.colors.primary};
  outline: 0;
  letter-spacing: 0.1rem;
`;
