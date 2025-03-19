import React from 'react';
import styled from 'styled-components';
import { FiUserCheck, FiClock } from 'react-icons/fi';
import { GiBeerStein } from 'react-icons/gi';

interface MatchStatsProps {
  confirmedCount: number;
  resenhaCount: number;
  pendingCount: number;
}

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows?.small};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div<{ $type: 'confirmed' | 'resenha' | 'pending' }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'confirmed':
        return theme.colors.primary.main;
      case 'resenha':
        return theme.colors.accent.main;
      case 'pending':
        return theme.colors.neutral.main;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

const IconWrapper = styled.div<{ $type: 'confirmed' | 'resenha' | 'pending' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case 'confirmed':
        return theme.colors.primary.light;
      case 'resenha':
        return theme.colors.accent.light;
      case 'pending':
        return theme.colors.neutral.light;
      default:
        return theme.colors.background.default;
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'confirmed':
        return theme.colors.primary.main;
      case 'resenha':
        return theme.colors.accent.main;
      case 'pending':
        return theme.colors.neutral.main;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

const MatchStats: React.FC<MatchStatsProps> = ({
  confirmedCount,
  resenhaCount,
  pendingCount
}) => {
  return (
    <StatsContainer>
      <StatCard>
        <IconWrapper $type="confirmed">
          <FiUserCheck size={18} />
        </IconWrapper>
        <StatValue $type="confirmed">{confirmedCount}</StatValue>
        <StatLabel>Confirmados</StatLabel>
      </StatCard>

      <StatCard>
        <IconWrapper $type="resenha">
          <GiBeerStein size={18} />
        </IconWrapper>
        <StatValue $type="resenha">{resenhaCount}</StatValue>
        <StatLabel>Resenha</StatLabel>
      </StatCard>

      <StatCard>
        <IconWrapper $type="pending">
          <FiClock size={18} />
        </IconWrapper>
        <StatValue $type="pending">{pendingCount}</StatValue>
        <StatLabel>Pendentes</StatLabel>
      </StatCard>
    </StatsContainer>
  );
};

export default MatchStats; 