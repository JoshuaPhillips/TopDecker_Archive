// colors

const color__primary = '#385170';
const color__background = 'whitesmoke';
const color__danger = 'firebrick';

// fonts

const font_size__base = 1; // in rem

const calculateFontSize = modifier => {
  return font_size__base + modifier * 0.2 + 'rem';
};

// borders

const standardBorderMixin = () => {
  return 'border: 1px solid lightgrey; border-bottom: 2px solid lightgrey;';
};

export const Theme = {
  borders: {
    standard: standardBorderMixin()
  },
  colors: {
    primary: color__primary,
    background: color__background,
    danger: color__danger
  },
  fonts: {
    family: 'sans-serif',
    sizes: {
      extraSmall: calculateFontSize(-1),
      small: calculateFontSize(-0.5),
      base: calculateFontSize(0),
      large: calculateFontSize(1),
      extraLarge: calculateFontSize(2)
    },
    weights: {
      base: 'normal',
      bold: 'bold'
    }
  }
};
