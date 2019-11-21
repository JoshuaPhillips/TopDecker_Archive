import styled from "styled-components";

export const StyledAccount = styled.main`
  border: ${props => props.theme.borders.standard}
  background-color: white;
  box-shadow: 5px 5px 7px #c7c7c7;
  width: 50%;
  padding: 3rem 3rem 0;
  border-radius: 5px;
  margin: 4rem auto;

  h1 {
    width: 80%;
    margin: 1rem auto;
  }
`;

export const AccountForm = styled.form`
  width: 80%;
  margin: auto;
`;

export const AccountFormButtonsWrapper = styled.div`
  margin: 1rem auto 2rem;
  button {
    margin-right: 0.5rem;

    &:first-child {
      margin-left: 1.5rem;
    }
  }
`;

export const DangerZoneButtonsWrapper = styled.div`
  width: 80%;
  margin: 2rem auto 2rem;

  button {
    margin-right: 0.5rem;

    &:first-child {
      margin-left: 1.5rem;
    }
  }
`;

export const DeleteConfirmationMessage = styled.div`
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;
