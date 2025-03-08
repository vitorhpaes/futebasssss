import { amber, amberDark, blue, blueDark, green, greenDark, mauve, mauveDark, red, redDark } from '@radix-ui/colors';

// Cores principais baseadas nas cores do futebol (campo verde, bola branca, etc)
export const lightTheme = {
  colors: {
    primary: {
      ...green,
      main: green.green9,
      light: green.green7,
      dark: green.green11,
    },
    secondary: {
      ...blue,
      main: blue.blue9,
      light: blue.blue7,
      dark: blue.blue11,
    },
    accent: {
      ...amber,
      main: amber.amber9,
      light: amber.amber7,
      dark: amber.amber11,
    },
    error: {
      ...red,
      main: red.red9,
      light: red.red7,
      dark: red.red11,
    },
    neutral: {
      ...mauve,
      main: mauve.mauve9,
      light: mauve.mauve7,
      dark: mauve.mauve11,
    },
    background: {
      paper: mauve.mauve1,
      default: mauve.mauve2,
    },
    text: {
      primary: mauve.mauve12,
      secondary: mauve.mauve11,
      hint: mauve.mauve9,
    },
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'uppercase',
    },
  },
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

export const darkTheme = {
  colors: {
    primary: {
      ...greenDark,
      main: greenDark.green9,
      light: greenDark.green7,
      dark: greenDark.green11,
    },
    secondary: {
      ...blueDark,
      main: blueDark.blue9,
      light: blueDark.blue7,
      dark: blueDark.blue11,
    },
    accent: {
      ...amberDark,
      main: amberDark.amber9,
      light: amberDark.amber7,
      dark: amberDark.amber11,
    },
    error: {
      ...redDark,
      main: redDark.red9,
      light: redDark.red7,
      dark: redDark.red11,
    },
    neutral: {
      ...mauveDark,
      main: mauveDark.mauve9,
      light: mauveDark.mauve7,
      dark: mauveDark.mauve11,
    },
    background: {
      paper: mauveDark.mauve1,
      default: mauveDark.mauve2,
    },
    text: {
      primary: mauveDark.mauve12,
      secondary: mauveDark.mauve11,
      hint: mauveDark.mauve9,
    },
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  typography: lightTheme.typography,
  shadows: lightTheme.shadows,
};

export type ThemeType = typeof lightTheme; 