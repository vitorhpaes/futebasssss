import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-weight: 600;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
      text-decoration: underline;
    }
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  /* Form elements */
  input, textarea, select {
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.neutral.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    padding: ${({ theme }) => theme.spacing[2]};
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}33;
    }
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    background-color: ${({ theme }) => theme.colors.neutral.light}33;
    padding: ${({ theme }) => theme.spacing[1]};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`; 