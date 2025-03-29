import React from 'react';
import styled from 'styled-components';
import { SessionStatus, sessionStatusMap } from '@futebass-ia/constants';
import { formatDateTime } from '../../utils/date-utils';
import { FiMapPin, FiCalendar, FiClock, FiEdit, FiFileText, FiInfo, FiTrash2, FiStar } from 'react-icons/fi';
import { Match } from '../../services/matches/matches.interfaces';

// Props para o componente
export interface MatchCardProps {
  match: Match;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// Estilos
const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MatchTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const MatchDateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

interface StatusBadgeProps {
  $status: SessionStatus;
}

const StatusBadge = styled.span<StatusBadgeProps>`
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

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const FieldValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TeamsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  position: relative;
`;

const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 45%;
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const TeamName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CaptainInfo = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VersusText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

const Notes = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 8px;
  font-style: italic;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.primary.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.error.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

// Componente
const MatchCard: React.FC<MatchCardProps> = ({ match, onEdit, onDelete }) => {
  // Obter o status em texto mais amigável
  const getStatusLabel = (status: SessionStatus): string => {
    return sessionStatusMap.get(status) || String(status);
  };

  // Extrair a data e hora para exibição
  const date = formatDateTime(match.date, 'DD/MM/YYYY');
  const time = formatDateTime(match.date, 'HH:mm');

  // Encontrar os times A e B a partir do array de times
  const teamA = match.teams && match.teams.length > 0 ? match.teams[0] : null;
  const teamB = match.teams && match.teams.length > 1 ? match.teams[1] : null;

  return (
    <CardContainer>
      <CardHeader>
        <MatchInfo>
          <MatchTitle>
            <FiMapPin />
            {match.location}
          </MatchTitle>
          <MatchDateTime>
            <FiCalendar size={12} />
            {date}
            <FiClock size={12} />
            {time}
          </MatchDateTime>
        </MatchInfo>
        <StatusBadge $status={match.status}>
          {getStatusLabel(match.status)}
        </StatusBadge>
      </CardHeader>
      
      <TeamsContainer>
        <TeamBlock>
          <TeamInfo>
            <TeamName>{teamA?.name || 'Time A'}</TeamName>
            {teamA?.captain?.user && (
              <CaptainInfo>
                <FiStar size={10} />
                {teamA.captain.user.name}
              </CaptainInfo>
            )}
          </TeamInfo>
        </TeamBlock>
        
        <VersusText>VS</VersusText>
        
        <TeamBlock>
          <TeamInfo>
            <TeamName>{teamB?.name || 'Time B'}</TeamName>
            {teamB?.captain?.user && (
              <CaptainInfo>
                <FiStar size={10} />
                {teamB.captain.user.name}
              </CaptainInfo>
            )}
          </TeamInfo>
        </TeamBlock>
      </TeamsContainer>
      
      <CardContent>
        {match.notes && (
          <CardField>
            <FieldLabel>
              <FiFileText size={12} />
              Anotações
            </FieldLabel>
            <Notes>{match.notes}</Notes>
          </CardField>
        )}
        
        <CardField>
          <FieldLabel>
            <FiInfo size={12} />
            Informações Adicionais
          </FieldLabel>
          <FieldValue>ID da Partida: {match.id}</FieldValue>
        </CardField>
      </CardContent>
      
      {(onEdit || onDelete) && (
        <CardActions>
          {onDelete && (
            <DeleteButton onClick={() => onDelete(match.id)}>
              <FiTrash2 size={14} />
              Excluir
            </DeleteButton>
          )}
          {onEdit && (
            <EditButton onClick={() => onEdit(match.id)}>
              <FiEdit size={14} />
              Gerenciar partida
            </EditButton>
          )}
        </CardActions>
      )}
    </CardContainer>
  );
};

export default MatchCard; 