import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  line-height: ${({ theme }) => theme.typography.button.lineHeight};
  text-transform: ${({ theme }) => theme.typography.button.textTransform};

  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing[1]} ${theme.spacing[2]};
          font-size: 11px;
          min-height: 24px;
          min-width: 60px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: 16px;
        `;
      case 'md':
      default:
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: 14px;
        `;
    }
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary.main};
          color: white;
          &:hover {
            background-color: ${theme.colors.primary.dark};
          }
          &:disabled {
            background-color: ${theme.colors.neutral.light};
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.neutral.light};
          &:hover {
            background-color: ${theme.colors.background.default};
          }
          &:disabled {
            color: ${theme.colors.neutral.light};
            cursor: not-allowed;
          }
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.accent.main};
          color: white;
          &:hover {
            background-color: ${theme.colors.accent.dark};
          }
          &:disabled {
            background-color: ${theme.colors.neutral.light};
            cursor: not-allowed;
            opacity: 0.7;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          &:hover {
            background-color: ${theme.colors.background.default};
          }
          &:disabled {
            color: ${theme.colors.neutral.light};
            cursor: not-allowed;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary.main};
          color: white;
          &:hover {
            background-color: ${theme.colors.primary.dark};
          }
          &:disabled {
            background-color: ${theme.colors.neutral.light};
            cursor: not-allowed;
          }
        `;
    }
  }}
`; 