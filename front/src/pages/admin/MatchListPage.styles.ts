import styled from 'styled-components';
import { SessionStatus } from '@futebass-ia/constants';

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
  border-radius: 5px;
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

export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;

  &:last-child {
    text-align: right;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;

  &:last-child {
    text-align: right;
  }

  display: flex;
  align-items: center;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 500;
  padding: 6px 12px;
  transition: color 0.2s;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
    text-decoration: underline;
  }
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