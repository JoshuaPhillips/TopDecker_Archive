import styled from 'styled-components';

export const StyledSidebarSearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.5rem 1rem;
  border-top: 1px dashed lightgrey;
  cursor: pointer;
  transition: 0.1s all ease-in-out;

  &:first-child {
    border-top: 0;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }

  .SidebarSearchResultHeader {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
