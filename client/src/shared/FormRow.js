import styled from 'styled-components';

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;

  label {
    width: 30%;
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fonts.weights.bold};
  }

  input {
    color: ${props => props.theme.colors.primary}
    width: 70%;
    outline: none;
    letter-spacing: 0.1rem;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    padding: 0.5rem;
  }

  select {
    border: 2px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    outline: 0;
    letter-spacing: .1rem;
  }
`;
