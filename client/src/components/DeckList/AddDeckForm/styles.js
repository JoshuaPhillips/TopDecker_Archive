import styled, { css } from 'styled-components';

export const ReactSelectStyles = css`
   {
    container: ${() => ({
      width: '70%',
      border: `2px solid ${props => props.theme.colors.primary}`,
      borderRadius: '5px'
    })};
  }
`;
