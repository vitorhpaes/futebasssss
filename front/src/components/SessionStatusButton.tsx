import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import styled from 'styled-components';
import { useToast } from './ui/Toast';
import { useUpdateMatchStatusMutation } from '../services/matches/matches.queries';
import { SessionStatus } from '@futebasssss-ia/constants';
import { FiCalendar, FiCheck, FiX, FiChevronDown } from 'react-icons/fi';

const StyledTrigger = styled(Select.Trigger)<{ $status: SessionStatus }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case SessionStatus.SCHEDULED:
        return theme.colors.secondary.light;
      case SessionStatus.COMPLETED:
        return theme.colors.primary.light;
      case SessionStatus.CANCELED:
        return theme.colors.error.light;
      default:
        return theme.colors.background.paper;
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case SessionStatus.SCHEDULED:
        return theme.colors.secondary.dark;
      case SessionStatus.COMPLETED:
        return theme.colors.primary.dark;
      case SessionStatus.CANCELED:
        return theme.colors.error.dark;
      default:
        return theme.colors.text.primary;
    }
  }};
  border: 1px solid ${({ theme, $status }) => {
    switch ($status) {
      case SessionStatus.SCHEDULED:
        return theme.colors.secondary.main;
      case SessionStatus.COMPLETED:
        return theme.colors.primary.main;
      case SessionStatus.CANCELED:
        return theme.colors.error.main;
      default:
        return theme.colors.neutral.light;
    }
  }};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.95);
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }

  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledContent = styled(Select.Content)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  min-width: 160px;
  z-index: 100;
`;

const StyledViewport = styled(Select.Viewport)`
  padding: 5px;
`;

const StyledItem = styled(Select.Item)`
  font-size: 13px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  position: relative;
  user-select: none;
  cursor: pointer;
  gap: 8px;

  &[data-highlighted] {
    outline: none;
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.text.hint};
    pointer-events: none;
  }
`;

const StatusIcon = styled.div<{ $status: SessionStatus }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case SessionStatus.SCHEDULED:
        return theme.colors.secondary.main;
      case SessionStatus.COMPLETED:
        return theme.colors.primary.main;
      case SessionStatus.CANCELED:
        return theme.colors.error.main;
      default:
        return theme.colors.neutral.main;
    }
  }};
  color: white;
  font-size: 12px;
`;

interface SessionStatusButtonProps {
  sessionId: number;
  currentStatus: SessionStatus;
  onStatusChange?: (newStatus: SessionStatus) => void;
}

const statusOptions = [
  { value: SessionStatus.SCHEDULED, label: 'Agendada', icon: FiCalendar },
  { value: SessionStatus.COMPLETED, label: 'Finalizada', icon: FiCheck },
  { value: SessionStatus.CANCELED, label: 'Cancelada', icon: FiX },
];

export function SessionStatusButton({
  sessionId,
  currentStatus,
  onStatusChange,
}: SessionStatusButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const updateStatus = useUpdateMatchStatusMutation();

  const handleStatusChange = async (newStatus: SessionStatus) => {
    try {
      setIsLoading(true);
      await updateStatus.mutateAsync({
        id: sessionId,
        status: newStatus,
      });
      
      onStatusChange?.(newStatus);
      showToast('Status atualizado com sucesso!', { type: 'success' });
    } catch (error) {
      showToast('Erro ao atualizar o status', { type: 'error' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentOption = statusOptions.find(option => option.value === currentStatus);
  const Icon = currentOption?.icon || FiCalendar;

  return (
    <Select.Root
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isLoading || updateStatus.isPending}
    >
      <StyledTrigger $status={currentStatus}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StatusIcon $status={currentStatus}>
            <Icon size={12} />
          </StatusIcon>
          <Select.Value>
            {currentOption?.label || 'Alterar status'}
          </Select.Value>
        </div>
        <FiChevronDown size={16} />
      </StyledTrigger>
      <Select.Portal>
        <StyledContent>
          <StyledViewport>
            {statusOptions.map((option) => (
              <StyledItem key={option.value} value={option.value}>
                <StatusIcon $status={option.value}>
                  <option.icon size={12} />
                </StatusIcon>
                <Select.ItemText>{option.label}</Select.ItemText>
              </StyledItem>
            ))}
          </StyledViewport>
        </StyledContent>
      </Select.Portal>
    </Select.Root>
  );
} 