// Styled Components
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

body {
  font-family: ${props => props.theme.fonts.family}
  font-size: ${props => props.theme.fonts.sizes.base}
  font-weight: ${props => props.theme.fonts.weights.base};
  background-color: ${props => props.theme.colors.background};
}

button {
  outline: 0;
  border: 0;
  cursor: pointer;
}

img {
  width: 100%;
  display: block;
}

a {
  text-decoration: none;
}

ul, ol {
  list-style: none;
}
`;

export default GlobalStyles;
