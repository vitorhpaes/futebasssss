/// <reference types="vite/client" />

import { ThemeType } from './theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
