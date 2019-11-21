import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.deepBlue};
  color: ${props => props.theme.colors.whiteSmoke};
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
