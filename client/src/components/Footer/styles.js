import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  font-weight: ${props => props.theme.fonts.weights.bold}
  padding: 1rem;
  font-style: italic;
  letter-spacing: 0.1rem;
  text-align: center;
  font-size: ${props => props.theme.fonts.sizes.extraSmall};

  p {
    width: 80%;
    margin: auto;
  }
`;
