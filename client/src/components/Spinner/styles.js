import styled, { keyframes } from 'styled-components';

const load8 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;

  margin: 4rem auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 0, 0, 0.2);
  border-right: 1.1em solid rgba(0, 0, 0, 0.2);
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid ${props => props.theme.colors.primary};

  transform: translateZ(0);
  animation: ${load8} 1.1s infinite linear;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;
