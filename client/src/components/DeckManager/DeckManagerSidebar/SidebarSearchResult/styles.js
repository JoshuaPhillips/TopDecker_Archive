import styled from "styled-components";

export const StyledSidebarSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  border-top: 1px dashed lightgrey;
  cursor: pointer;
  transition: 0.1s all ease-in-out;
  color: ${props =>
    props.unavailable ? "lightgrey" : props.theme.colors.deepBlue}
  user-select: none;

  &:first-child {
    border-top: 0;
  }

  &:hover {
    background-color: ${props =>
      props.unavailable
        ? props.theme.colors.whiteSmoke
        : props.theme.colors.deepBlue};
    color: ${props =>
      props.unavailable ? "lightgrey" : props.theme.colors.whiteSmoke};
  }

  .SidebarSearchResultHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
