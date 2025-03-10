import React from 'react';
import styled from 'styled-components';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

// Tipos de alerta
export type AlertType = 'success' | 'error' | 'info' | 'warning';

// Interface para as props do componente
export interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

// Container estilizado do alerta
const AlertContainer = styled.div<{ $type: AlertType }>`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 6px;
  position: relative;
  gap: 12px;
  
  ${({ $type, theme }) => {
    switch ($type) {
      case 'success':
        return `
          background-color: ${theme.colors.primary.light}15;
          border-left: 4px solid ${theme.colors.primary.main};
          color: ${theme.colors.primary.dark};
          
          .alert-icon {
            color: ${theme.colors.primary.main};
          }
        `;
      case 'error':
        return `
          background-color: ${theme.colors.error.light}15;
          border-left: 4px solid ${theme.colors.error.main};
          color: ${theme.colors.error.dark};
          
          .alert-icon {
            color: ${theme.colors.error.main};
          }
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.accent.light}15;
          border-left: 4px solid ${theme.colors.accent.main};
          color: ${theme.colors.accent.dark};
          
          .alert-icon {
            color: ${theme.colors.accent.main};
          }
        `;
      case 'info':
      default:
        return `
          background-color: ${theme.colors.secondary.light}15;
          border-left: 4px solid ${theme.colors.secondary.main};
          color: ${theme.colors.secondary.dark};
          
          .alert-icon {
            color: ${theme.colors.secondary.main};
          }
        `;
    }
  }}
  
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  font-size: 20px;
  margin-top: 2px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h4`
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 15px;
`;

const AlertMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

// Componente Alert
const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  closable = true,
  className
}) => {
  // Função para determinar o ícone com base no tipo
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="alert-icon" size={20} />;
      case 'error':
        return <FiAlertCircle className="alert-icon" size={20} />;
      case 'warning':
        return <FiAlertCircle className="alert-icon" size={20} />;
      case 'info':
      default:
        return <FiInfo className="alert-icon" size={20} />;
    }
  };

  // Determinar título padrão baseado no tipo, se não for fornecido
  const getDefaultTitle = () => {
    switch (type) {
      case 'success':
        return 'Sucesso';
      case 'error':
        return 'Erro';
      case 'warning':
        return 'Atenção';
      case 'info':
      default:
        return 'Informação';
    }
  };

  const displayTitle = title || getDefaultTitle();

  return (
    <AlertContainer $type={type} className={className}>
      <IconWrapper>
        {getIcon()}
      </IconWrapper>

      <ContentWrapper>
        {displayTitle && <AlertTitle>{displayTitle}</AlertTitle>}
        <AlertMessage>{message}</AlertMessage>
      </ContentWrapper>

      {closable && onClose && (
        <CloseButton onClick={onClose}>
          <FiX size={16} />
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert; 