import React from 'react';
import styled from 'styled-components';
import { getPositionLabel, getUserTypeLabel } from '../../utils/user-helpers';
import { UserType, Position } from '@futebass-ia/constants';
import { formatDate } from '../../utils/date-utils';
import { FiUser, FiEdit, FiMail, FiCalendar } from 'react-icons/fi';

// Tipos de visualização
export type ViewMode = 'full' | 'compact';

// Interface para o jogador
export interface PlayerData {
  id: number;
  name: string;
  email: string;
  type: string;
  position?: string | null;
  createdAt: string;
}

// Props para o componente
export interface PlayerCardProps {
  player: PlayerData;
  viewMode?: ViewMode;
  onEdit?: (id: number) => void;
}

// Estilos
const CardContainer = styled.div<{ $viewMode: ViewMode }>`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: ${({ $viewMode }) => ($viewMode === 'full' ? '20px' : '12px')};
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

const PlayerName = styled.h2`
  font-size: 18px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface BadgeProps {
  $type: 'PLAYER' | 'ADMIN';
}

const Badge = styled.span<BadgeProps>`
  background-color: ${({ theme, $type }) => 
    $type === 'ADMIN' ? theme.colors.error.main : theme.colors.primary.main};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`;

const FieldValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
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

const CompactLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
`;

const CompactName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CompactPosition = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Componente
const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  viewMode = 'full', 
  onEdit 
}) => {
  // Renderização do modo compacto
  if (viewMode === 'compact') {
    return (
      <CardContainer $viewMode="compact">
        <CompactLayout>
          <CompactName>{player.name}</CompactName>
          <CompactPosition>
            {player.position ? getPositionLabel(player.position) : 'Posição não definida'}
          </CompactPosition>
        </CompactLayout>
      </CardContainer>
    );
  }

  // Renderização do modo completo
  return (
    <CardContainer $viewMode="full">
      <CardHeader>
        <PlayerName>
          <FiUser />
          {player.name}
        </PlayerName>
        <Badge $type={player.type === 'ADMIN' ? 'ADMIN' : 'PLAYER'}>
          {getUserTypeLabel(player.type)}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <CardField>
          <FieldLabel>
            <FiMail size={12} />
            Email
          </FieldLabel>
          <FieldValue>{player.email}</FieldValue>
        </CardField>
        
        <CardField>
          <FieldLabel>Posição</FieldLabel>
          <FieldValue>{getPositionLabel(player.position)}</FieldValue>
        </CardField>
        
        <CardField>
          <FieldLabel>
            <FiCalendar size={12} />
            Data de Cadastro
          </FieldLabel>
          <FieldValue>{formatDate(player.createdAt)}</FieldValue>
        </CardField>
      </CardContent>
      
      {onEdit && (
        <CardActions>
          <EditButton onClick={() => onEdit(player.id)}>
            <FiEdit size={14} />
            Editar
          </EditButton>
        </CardActions>
      )}
    </CardContainer>
  );
};

export default PlayerCard; 