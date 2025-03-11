import styled from 'styled-components';
import { SessionStatus } from '@futebass-ia/constants';
import * as Form from '@radix-ui/react-form';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  svg {
    margin-right: 8px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 16px 0;
`;

export const FilterWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

export const FilterContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: 24px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 500px;
  max-width: calc(100vw - 40px);
  z-index: 10;
  
  @media (max-width: 768px) {
    left: 0;
    right: auto;
    width: 100%;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.background.paper};
    transform: rotate(45deg);
    
    @media (max-width: 768px) {
      right: auto;
      left: 20px;
    }
  }
`;

export const StyledForm = styled(Form.Root)`
  width: 100%;
`;

export const FilterFormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled(Form.Field)`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled(Form.Label)`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light}40;
  }
`;

export const FilterActions = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 16px;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  &:focus {
    outline: none;
  }
`;

export const PrimaryButton = styled(FilterButton)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const SecondaryButton = styled(FilterButton)`
  background-color: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 5;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const EmptyStateTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const EmptyStateText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.background.default};
  border-top: 3px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorContainer = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.error.light}20;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error.main};
  margin: 0;
`;

interface StatusBadgeProps {
  $status: SessionStatus;
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${({ $status, theme }) => {
    switch ($status) {
      case SessionStatus.SCHEDULED:
        return `
          background-color: ${theme.colors.primary.light}20;
          color: ${theme.colors.primary.dark};
        `;
      case SessionStatus.COMPLETED:
        return `
          background-color: ${theme.colors.secondary.light}20;
          color: ${theme.colors.secondary.dark};
        `;
      case SessionStatus.CANCELED:
        return `
          background-color: ${theme.colors.error.light}20;
          color: ${theme.colors.error.dark};
        `;
      default:
        return '';
    }
  }}
`; 