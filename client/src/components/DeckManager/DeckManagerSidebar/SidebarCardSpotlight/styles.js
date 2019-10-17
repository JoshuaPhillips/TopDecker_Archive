import styled from 'styled-components';

export const StyledSidebarCardSpotlight = styled.div`
  padding: 0 0.5rem;

  div:last-child {
    display: flex;
    font-weight: ${props => props.theme.fonts.weights.bold};
    margin: 0.5rem 0;
    padding-left: 0.5rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    p {
      margin-left: 0.5rem;
      font-size: ${props => props.theme.fonts.sizes.large};
    }
  }
`;
