import styled from 'styled-components';

export const StyledAuth = styled.main`
  border: 1px solid #c7c7c7;
  box-shadow: 5px 5px 7px #c7c7c7;
  width: 50%;
  padding: 3rem 3rem 2rem;
  border-radius: 5px;
  margin: 1rem auto;

  .loginModeToggleText {
    width: fit-content;
    margin: auto;
    padding: 0.5rem;
    cursor: pointer;
    border-bottom: 2px solid ${props => props.theme.colors.primary};

    &:hover {
      transform: scale(1.01);
    }
  }
`;
