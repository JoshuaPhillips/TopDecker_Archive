import styled from "styled-components";

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const Button = styled.button`
  border: 2px solid ${({
    theme: {
      colors: { deepBlue }
    }
  }) => deepBlue}
  background-color: ${props =>
    props.inverted ? "inherit" : props.theme.colors.deepBlue}
  color: ${({
    inverted,
    theme: {
      colors: { deepBlue, whiteSmoke }
    }
  }) => (inverted ? deepBlue : whiteSmoke)}
  padding: 0.5rem;
  border-radius: 3px;
  
  transition: .2s all ease-in-out;

  &:hover {
    background-color: ${({
      inverted,
      theme: {
        colors: { deepBlue, whiteSmoke }
      }
    }) => (inverted ? deepBlue : whiteSmoke)}
        
    color: ${props =>
      props.inverted
        ? props.theme.colors.whiteSmoke
        : props.theme.colors.deepBlue}
  }

  &:disabled {
    background-color: lightgrey;
    border: 2px solid lightslategrey;
    color: lightslategrey;
  }

  &:disabled:hover {
    background-color: lightgrey;
    color: lightslategrey;
    
  }
  
  svg {
    margin-right: .25rem;
  }
`;

export const DangerButton = styled(Button)`
  border: 2px solid ${props => props.theme.colors.fireBrick}
  background-color: ${props =>
    props.inverted ? props.theme.colors.fireBrick : "inherit"}
  
  color: ${props =>
    props.inverted
      ? props.theme.colors.whiteSmoke
      : props.theme.colors.fireBrick}
  

  &:hover {
    background-color: ${props =>
      props.inverted
        ? props.theme.colors.whiteSmoke
        : props.theme.colors.fireBrick}
    color: ${props =>
      props.inverted
        ? props.theme.colors.fireBrick
        : props.theme.colors.whiteSmoke}
  }
`;
