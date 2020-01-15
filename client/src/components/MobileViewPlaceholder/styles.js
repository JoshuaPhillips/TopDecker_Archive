import styled from "styled-components";

export const StyledMobileViewPlaceholder = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  margin: auto;

  border: 2px solid ${props => props.theme.colors.deepBlue};
  border-radius: 5px;
  padding: 3rem;
  color: ${props => props.theme.colors.deepBlue};
  font-weight: bold;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  h2 {
    margin-top: 1rem;
  }
`;
