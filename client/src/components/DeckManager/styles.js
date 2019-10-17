import styled from 'styled-components';

export const StyledDeckManager = styled.main`
  display: flex;
  padding: 0 5rem;
  height: ${props => 100 - props.theme.sizing.headerHeight + 'vh'};
`;
