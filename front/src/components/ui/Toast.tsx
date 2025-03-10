import React, { createContext, useContext, useState } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { styled, keyframes } from 'styled-components';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

// Tipos de toast
export type ToastType = 'success' | 'error' | 'info';

// Interface para o contexto de toast
interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

// Criando o contexto
const ToastContext = createContext<ToastContextType | null>(null);

// Animações
const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + 25px));
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100% + 25px));
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Estilos dos componentes
const ToastViewport = styled(ToastPrimitive.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

const StyledToast = styled(ToastPrimitive.Root)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 6px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  padding: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  
  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1), ${fadeIn} 150ms ease;
  }
  
  &[data-state='closed'] {
    animation: ${slideOut} 150ms cubic-bezier(0, 0.67, 0.56, 1), ${fadeOut} 150ms ease;
  }
  
  &[data-type='success'] {
    border-left-color: ${({ theme }) => theme.colors.primary.main};
    
    .toast-icon {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
  
  &[data-type='error'] {
    border-left-color: ${({ theme }) => theme.colors.error.main};
    
    .toast-icon {
      color: ${({ theme }) => theme.colors.error.main};
    }
  }
  
  &[data-type='info'] {
    border-left-color: ${({ theme }) => theme.colors.secondary.main};
    
    .toast-icon {
      color: ${({ theme }) => theme.colors.secondary.main};
    }
  }
`;

const ToastContent = styled.div`
  flex: 1;
`;

const ToastTitle = styled(ToastPrimitive.Title)`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 15px;
`;

const ToastDescription = styled(ToastPrimitive.Description)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  line-height: 1.5;
`;

const ToastClose = styled(ToastPrimitive.Close)`
  all: unset;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ToastIconWrapper = styled.div`
  margin-top: 2px;
  font-size: 20px;
`;

// Componente Toast
const Toast: React.FC<{ 
  message: string;
  type: ToastType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ message, type, open, onOpenChange }) => {
  // Determinar ícone com base no tipo
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="toast-icon" />;
      case 'error':
        return <FiAlertCircle className="toast-icon" />;
      case 'info':
        return <FiInfo className="toast-icon" />;
      default:
        return <FiInfo className="toast-icon" />;
    }
  };

  // Determinar título com base no tipo
  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Sucesso';
      case 'error':
        return 'Erro';
      case 'info':
        return 'Informação';
      default:
        return 'Notificação';
    }
  };

  return (
    <StyledToast open={open} onOpenChange={onOpenChange} data-type={type}>
      <ToastIconWrapper>
        {getIcon()}
      </ToastIconWrapper>
      
      <ToastContent>
        <ToastTitle>{getTitle()}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </ToastContent>
      
      <ToastClose>
        <FiX size={16} />
      </ToastClose>
    </StyledToast>
  );
};

// Provedor do Toast
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');

  const showToast = (newMessage: string, newType: ToastType = 'info', duration = 5000) => {
    setMessage(newMessage);
    setType(newType);
    setOpen(true);
    
    // Resetar após "duration" ms
    if (duration > 0) {
      setTimeout(() => {
        setOpen(false);
      }, duration);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <Toast 
          message={message}
          type={type}
          open={open}
          onOpenChange={setOpen}
        />
        <ToastViewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

// Hook para usar o toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default Toast; 