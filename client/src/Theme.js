// colors

const color__deepBlue = "#385170";
const color__whiteSmoke = "whitesmoke";
const color__fireBrick = "firebrick";

// fonts

const font_size__base = 1; // in rem

const calculateFontSize = modifier => {
  return font_size__base + modifier * 0.25 + "rem";
};

export const Theme = {
  borders: {
    standard: `1px solid lightgrey`,
    thick: `2px solid lightgrey`
  },
  colors: {
    deepBlue: color__deepBlue,
    whiteSmoke: color__whiteSmoke,
    fireBrick: color__fireBrick
  },
  fonts: {
    family: "sans-serif",
    sizes: {
      extraSmall: calculateFontSize(-1),
      small: calculateFontSize(-0.5),
      base: calculateFontSize(0),
      large: calculateFontSize(1),
      extraLarge: calculateFontSize(2)
    },
    weights: {
      base: "normal",
      bold: "bold"
    }
  }
};
