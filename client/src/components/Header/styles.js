import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};

  padding: 0 5rem;
  height: ${props => props.theme.sizing.headerHeight + 'vh'}
  font-weight: bold;

  h1 {
    font-size: ${props => props.theme.fonts.sizes.extraLarge};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavigationLink = styled.button`
  padding: 1rem;
  border-radius: 3px;
  transition: 0.2s all ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
  }
`;
