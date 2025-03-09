import { createGlobalStyle } from 'styled-components';

export const GlobalStylesComponent = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 100%;
    
    /* Ajusta o tamanho da fonte base para telas menores */
    @media (max-width: 768px) {
      font-size: 95%;
    }
    
    @media (max-width: 480px) {
      font-size: 90%;
    }
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease;
    overflow-x: hidden; /* Previne rolagem horizontal */
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-weight: 600;
    
    /* Ajustes responsivos para títulos */
    @media (max-width: 768px) {
      margin-bottom: ${({ theme }) => theme.spacing[3]};
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    @media (max-width: 768px) {
      margin-bottom: ${({ theme }) => theme.spacing[3]};
    }
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
    width: 100%; /* Form elements ocupam 100% da largura do container */
    
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
    display: block; /* Evita espaços extras abaixo das imagens */
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    @media (max-width: 768px) {
      margin-bottom: ${({ theme }) => theme.spacing[3]};
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    background-color: ${({ theme }) => theme.colors.neutral.light}33;
    padding: ${({ theme }) => theme.spacing[1]};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
  
  /* Classes utilitárias para responsividade */
  .hide-on-mobile {
    @media (max-width: 768px) {
      display: none !important;
    }
  }
  
  .show-on-mobile {
    display: none !important;
    
    @media (max-width: 768px) {
      display: block !important;
    }
  }
  
  /* Utilitário para esconder visualmente elementos mantendo-os acessíveis para leitores de tela */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* Garantir que containers flexíveis sejam responsivos */
  .flex-container {
    display: flex;
    flex-wrap: wrap;
  }
`; 