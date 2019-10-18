import styled from 'styled-components';

export const StyledCardItemControls = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0 0 5px 5px;

  div {
    flex-grow: 1;
    &:last-child {
      margin-left: 0.5rem;
      text-align: right;
    }
  }

  button:disabled {
    color: lightgrey;
  }
`;
