// colors

const color__primary = '#385170';
const color__background = 'whitesmoke';
const color__success = 'forestgreen';
const color__danger = 'firebrick';

// fonts

const font_size__base = 1; // in rem

const calculateFontSize = modifier => {
  return font_size__base + modifier * 0.2 + 'rem';
};

// sizing

const header__height = 8;

export const Theme = {
  colors: {
    primary: color__primary,
    background: color__background,
    success: color__success,
    danger: color__danger
  },
  fonts: {
    family: 'sans-serif',
    sizes: {
      small: calculateFontSize(-0.5),
      base: calculateFontSize(0),
      large: calculateFontSize(1),
      extraLarge: calculateFontSize(2)
    },
    weights: {
      base: 'normal',
      bold: 'bold'
    }
  },
  sizing: {
    headerHeight: header__height
  }
};
