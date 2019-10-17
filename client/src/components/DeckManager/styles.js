import styled from 'styled-components';

export const StyledDeckManager = styled.main`
  display: flex;
  padding: 1rem 5rem 0;
  height: ${props => 100 - props.theme.sizing.headerHeight + 'vh'};
`;
