import styled from 'styled-components';
import { ReactNode } from 'react';

// Breakpoints em pixels
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Media queries para usar nos componentes styled
export const media = {
  xs: `@media (max-width: ${breakpoints.sm - 1}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  md: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  smDown: `@media (max-width: ${breakpoints.md - 1}px)`,
  mdDown: `@media (max-width: ${breakpoints.lg - 1}px)`,
  lgDown: `@media (max-width: ${breakpoints.xl - 1}px)`,
  smUp: `@media (min-width: ${breakpoints.sm}px)`,
  mdUp: `@media (min-width: ${breakpoints.md}px)`,
  lgUp: `@media (min-width: ${breakpoints.lg}px)`,
};

// Grid Container com suporte a diferentes tamanhos
export const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};
  
  ${media.sm} {
    max-width: 540px;
  }
  
  ${media.md} {
    max-width: 720px;
  }
  
  ${media.lg} {
    max-width: 960px;
  }
  
  ${media.xl} {
    max-width: 1140px;
  }
`;

// Container fluido (100% de largura)
export const ContainerFluid = styled.div`
  width: 100%;
  padding-right: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};
  margin-right: auto;
  margin-left: auto;
  
  ${media.smDown} {
    padding-right: ${({ theme }) => theme.spacing[3]};
    padding-left: ${({ theme }) => theme.spacing[3]};
  }
`;

// Grid Row com suporte a diferentes espaçamentos
interface RowProps {
  $gutter?: keyof typeof gutterSizes;
}

const gutterSizes = {
  xs: '0.5rem',  // 8px
  sm: '1rem',    // 16px
  md: '1.5rem',  // 24px
  lg: '2rem',    // 32px
};

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${({ $gutter = 'sm' }) => gutterSizes[$gutter]};
  margin-left: -${({ $gutter = 'sm' }) => gutterSizes[$gutter]};
`;

// Tipos para as colunas responsivas
interface ColProps {
  $xs?: number;
  $sm?: number;
  $md?: number;
  $lg?: number;
  $xl?: number;
  $gutter?: keyof typeof gutterSizes;
}

// Colunas responsivas
export const Col = styled.div<ColProps>`
  position: relative;
  width: 100%;
  padding-right: ${({ $gutter = 'sm' }) => gutterSizes[$gutter]};
  padding-left: ${({ $gutter = 'sm' }) => gutterSizes[$gutter]};
  
  ${({ $xs }) => 
    $xs !== undefined &&
    `
      flex: 0 0 ${($xs / 12) * 100}%;
      max-width: ${($xs / 12) * 100}%;
    `}
  
  ${({ $sm }) => 
    $sm !== undefined &&
    `
      ${media.smUp} {
        flex: 0 0 ${($sm / 12) * 100}%;
        max-width: ${($sm / 12) * 100}%;
      }
    `}
  
  ${({ $md }) => 
    $md !== undefined &&
    `
      ${media.mdUp} {
        flex: 0 0 ${($md / 12) * 100}%;
        max-width: ${($md / 12) * 100}%;
      }
    `}
  
  ${({ $lg }) => 
    $lg !== undefined &&
    `
      ${media.lgUp} {
        flex: 0 0 ${($lg / 12) * 100}%;
        max-width: ${($lg / 12) * 100}%;
      }
    `}
  
  ${({ $xl }) => 
    $xl !== undefined &&
    `
      ${media.xl} {
        flex: 0 0 ${($xl / 12) * 100}%;
        max-width: ${($xl / 12) * 100}%;
      }
    `}
`;

// Componentes para visibilidade condicional baseada em breakpoints
interface HideProps {
  $xs?: boolean;
  $sm?: boolean;
  $md?: boolean;
  $lg?: boolean;
  $xl?: boolean;
  children: ReactNode;
}

export const Hide = styled.div<HideProps>`
  ${({ $xs }) => $xs && `
    ${media.xs} {
      display: none !important;
    }
  `}
  
  ${({ $sm }) => $sm && `
    ${media.sm} {
      display: none !important;
    }
  `}
  
  ${({ $md }) => $md && `
    ${media.md} {
      display: none !important;
    }
  `}
  
  ${({ $lg }) => $lg && `
    ${media.lg} {
      display: none !important;
    }
  `}
  
  ${({ $xl }) => $xl && `
    ${media.xl} {
      display: none !important;
    }
  `}
`;

// Componente Card responsivo
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  ${media.smDown} {
    padding: ${({ theme }) => theme.spacing[3]};
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

// Componente para Grids de items flexíveis
interface FlexGridProps {
  $minWidth?: string;
  $gap?: string;
}

export const FlexGrid = styled.div<FlexGridProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ $minWidth = '250px' }) => $minWidth}, 1fr));
  gap: ${({ $gap = '1rem' }) => $gap};
  width: 100%;
`; 