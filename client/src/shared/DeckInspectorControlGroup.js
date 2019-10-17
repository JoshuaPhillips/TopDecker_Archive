import styled from 'styled-components';

export const DeckInspectorControlGroup = styled.div`
  text-align: center;
  width: 33%;

  p {
    margin: 0.5rem 0;
    font-weight: ${props => props.theme.fonts.weights.bold};
  }
`;
