import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  padding: 0 2rem;
  font-weight: bold;

  h1 {
    padding: 0.5rem 0;
    letter-spacing: 0.1rem;
    font-size: ${props => props.theme.fonts.sizes.extraLarge};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  a.active {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }
`;

export const NavigationLink = styled.button`
  align-self: center;
  transition: 0.2s all ease-in-out;
  padding: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
  }

  svg {
    margin-right: 0.25rem;
  }
`;
