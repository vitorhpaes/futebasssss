/// <reference types="vite/client" />

import { ThemeType } from './theme/theme';

declare module 'styled-components' {
  // Adiciona propriedades ao DefaultTheme herdando do ThemeType
   
  export interface DefaultTheme extends ThemeType {}
}
