import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
  
  @media (min-width: 768px) {
    margin-bottom: 24px;
    gap: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const MatchInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadows.small};

  @media (min-width: 768px) {
    padding: 20px;
    margin-bottom: 24px;
  }
`;

export const MatchHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const MatchTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export const MatchDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const MatchDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  background: ${({ theme }) => theme.colors.background.default};
  padding: 20px;
  border-radius: 8px;
  margin: 16px 0;
  position: relative;
  align-items: center;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px;
  }
`;

export const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  width: 100%;
`;

export const TeamName = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 4px;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

export const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const CaptainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: 16px;
  
  svg {
    color: ${({ theme }) => theme.colors.accent.main};
  }
`;

export const VersusText = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.neutral.light};
  box-shadow: ${({ theme }) => theme.shadows.small};
  z-index: 1;

  @media (max-width: 767px) {
    margin: 0 auto;
  }
`;

export const TeamDivider = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.neutral.light};
  z-index: 0;

  @media (max-width: 767px) {
    display: none;
  }
`;

// Estilização dos totalizadores
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 24px;
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const StatValue = styled.div<{ $type?: 'confirmed' | 'resenha' | 'pending' }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'confirmed':
        return theme.colors.primary.main;
      case 'resenha':
        return theme.colors.accent.main;
      case 'pending':
        return theme.colors.error.main;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0;
    gap: 12px;
  }
`;

export const PlayerItem = styled.div<{ $resenha?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: ${({ $resenha, theme }) => 
    $resenha ? `${theme.colors.accent.light}10` : theme.colors.background.paper};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    gap: 16px;
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const PlayerAvatar = styled.div<{ $resenha?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme, $resenha }) => 
    $resenha ? theme.colors.accent.light : theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $resenha }) => 
    $resenha ? theme.colors.accent.dark : theme.colors.primary.dark};
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
`;

export const PlayerName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlayerPosition = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PlayerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    width: auto;
  }
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

  .back-text {
    display: none;
    
    @media (min-width: 480px) {
      display: inline;
    }
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
  margin: 0 -16px 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  background: ${({ theme }) => theme.colors.background.paper};
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 16px;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    margin: 0 0 24px;
    padding: 0;
    position: relative;
    background: transparent;
  }
`;

export const Tab = styled.div<{ $active?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  white-space: nowrap;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary.main : theme.colors.text.secondary)};
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary.main : 'transparent')};
  transition: all 0.2s ease;
  min-width: max-content;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.background.default};
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 15px;
    gap: 8px;
  }
`;

export const TabContent = styled.div`
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 24px;
  }
`;

export const TabHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 16px;
  position: sticky;
  top: 49px; // Altura da aba + 1px da borda
  background: ${({ theme }) => theme.colors.background.default};
  z-index: 9;
  padding-top: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    position: relative;
    top: 0;
    background: transparent;
    margin-bottom: 24px;
  }
`;

export const TabTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.small};

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (min-width: 768px) {
    width: auto;
    min-width: 120px;
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