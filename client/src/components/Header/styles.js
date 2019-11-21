import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.deepBlue};
  color: ${props => props.theme.colors.whiteSmoke};
  padding: 0 2rem;
  font-weight: bold;

  h1 {
    text-transform: uppercase
    padding: 0.5rem 0;
    letter-spacing: 0.1rem;
    color: lightgrey;
    font-weight: bold;
    font-size: ${props => props.theme.fonts.sizes.extraLarge};

    span {
      color: ${props => props.theme.colors.whiteSmoke}
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  a.active {
    color: ${props => props.theme.colors.deepBlue};
    background-color: ${props => props.theme.colors.whiteSmoke};
  }
`;

export const NavigationLink = styled.button`
  align-self: center;
  transition: 0.2s all ease-in-out;
  padding: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.whiteSmoke};
    color: ${props => props.theme.colors.deepBlue};
  }

  svg {
    margin-right: 0.25rem;
  }
`;
