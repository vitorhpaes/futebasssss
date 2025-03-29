import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const MatchInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const MatchTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MatchDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const MatchDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.default};
  padding: 16px;
  border-radius: 8px;
  position: relative;
`;

export const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 45%;
`;

export const TeamName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

export const TeamColor = styled.div<{ $color?: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color || '#cccccc'};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

export const VersusText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${({ $status, theme }) => {
    switch ($status) {
      case 'SCHEDULED':
        return `
          background-color: ${theme.colors.primary.light}20;
          color: ${theme.colors.primary.dark};
        `;
      case 'COMPLETED':
        return `
          background-color: ${theme.colors.secondary.light}20;
          color: ${theme.colors.secondary.dark};
        `;
      case 'CANCELED':
        return `
          background-color: ${theme.colors.error.light}20;
          color: ${theme.colors.error.dark};
        `;
      default:
        return '';
    }
  }}
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  margin: 24px 0 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlayerList = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const PlayerItem = styled.div<{ $resenha?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
  background-color: ${({ $resenha, theme }) => $resenha ? `${theme.colors.accent.light}10` : 'transparent'};
  &:last-child {
    border-bottom: none;
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PlayerAvatar = styled.div<{ $resenha?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme, $resenha }) => $resenha ? theme.colors.accent.light : theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $resenha }) => $resenha ? theme.colors.accent.dark : theme.colors.primary.dark};
  font-weight: 600;
  font-size: 16px;
`;

export const PlayerName = styled.div`
  font-weight: 500;
`;

export const PlayerPosition = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PlayerActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ConfirmButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.primary.light};
    cursor: not-allowed;
  }
`;

export const ResenhaButton = styled.button`
  background: ${({ theme }) => theme.colors.accent.main};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent.dark};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.accent.light};
    cursor: not-allowed;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.colors.primary.main};
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const PlayerStatus = styled.div<{ $confirmed?: boolean; $resenha?: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  ${({ $confirmed, $resenha, theme }) => {
    if ($confirmed && $resenha) {
      return `
        background-color: ${theme.colors.accent.light}20;
        color: ${theme.colors.accent.dark};
      `;
    }
    if ($confirmed) {
      return `
        background-color: ${theme.colors.primary.light}20;
        color: ${theme.colors.primary.dark};
      `;
    }
    return `
      background-color: ${theme.colors.neutral.light};
      color: ${theme.colors.text.secondary};
    `;
  }}
`;

export const ActionSection = styled.div`
  display: flex;
  align-items: center;
`;

// Novos componentes para o sistema de abas
export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
  margin-bottom: 24px;
  overflow-x: auto;
`;

export const Tab = styled.div<{ $active?: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary.main : theme.colors.text.secondary)};
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary.main : 'transparent')};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

// Componentes para gerenciamento de times
export const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
  font-weight: 600;
`;

export const TeamPlayerList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const TeamPlayerItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const UnassignedPlayersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

export const UnassignedPlayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const EmptyTeamMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`; 