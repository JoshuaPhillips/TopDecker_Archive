import styled from 'styled-components';

export const Button = styled.button`
  border: 2px solid ${props => props.theme.colors.primary}
  background-color: ${props => (props.inverted ? props.theme.colors.primary : props.theme.colors.background)}
  color: ${props => (props.inverted ? props.theme.colors.background : props.theme.colors.primary)}
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0 0.5rem 0.5rem 0;
  transition: .2s all ease-in-out;

  &:hover {
    background-color: ${props => (props.inverted ? props.theme.colors.background : props.theme.colors.primary)}
    color: ${props => (props.inverted ? props.theme.colors.primary : props.theme.colors.background)}
  }

  &:disabled {
    background-color: lightgrey;
    border: 2px solid lightslategrey;
    color: lightslategrey;
  }

  &:disabled:hover {
    color: lightslategrey;
  }
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const SuccessButton = styled(Button)`
  border: 2px solid ${props => props.theme.colors.success}
  background-color: ${props => (props.inverted ? props.theme.colors.success : props.theme.colors.background)}
  color: ${props => (props.inverted ? props.theme.colors.background : props.theme.colors.success)}
`;

export const DangerButton = styled(Button)`
  border: 2px solid ${props => props.theme.colors.danger}
  background-color: ${props => (props.inverted ? props.theme.colors.danger : props.theme.colors.background)}
  
  color: ${props => (props.inverted ? props.theme.colors.background : props.theme.colors.danger)}
  

  &:hover {
    background-color: ${props => (props.inverted ? props.theme.colors.background : props.theme.colors.danger)}
    color: ${props => (props.inverted ? props.theme.colors.danger : props.theme.colors.background)}
  }
`;
