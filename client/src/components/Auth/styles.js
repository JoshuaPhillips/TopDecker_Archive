import styled from "styled-components";

export const StyledAuth = styled.main`
  border: ${props => props.theme.borders.standard}
  background-color: white;
  box-shadow: 5px 5px 7px #c7c7c7;
  width: 50%;
  padding: 3rem 3rem 2rem;
  border-radius: 5px;
  margin: 4rem auto;

  .loginModeToggleText {
    width: fit-content;
    margin: auto;
    padding: 0.5rem;
    cursor: pointer;
    border-bottom: 2px solid ${props => props.theme.colors.deepBlue};

    &:hover {
      transform: scale(1.01);
    }
  }
`;

export const AuthForm = styled.form`
  width: 80%;
  margin: auto;
`;

export const AuthFormButtonsWrapper = styled.div`
  margin: 1rem auto 2rem;
  button {
    margin-right: 0.5rem;

    &:first-child {
      margin-left: 1.5rem;
    }
  }
`;
