import React from 'react';
import * as S from '../../pages/admin/MatchManagePage.styles';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';
import { useUpdateTeamCaptain } from '../../services/teams/teams.queries';
import { Button } from '../../components/ui/Button';
import { FiStar } from 'react-icons/fi';
import styled from 'styled-components';
import { useToast } from '../../components/ui/Toast';
import { Team } from '../../services/teams/teams.interfaces';

interface TeamComponentProps {
  team?: Team;
  players: PlayerSession[];
  handleAddToTeam: (userId: number, teamId: number | undefined) => void;
  opposingTeam?: Team;
  isDisabled?: boolean;
}

const PlayerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  gap: ${({ theme }) => theme.spacing[2]};
  min-width: fit-content;
`;

const PlayerItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const CaptainBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.primary.light}20;
  color: ${({ theme }) => theme.colors.primary.dark};
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
`;

const CaptainInfo = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TeamComponent: React.FC<TeamComponentProps> = ({
  team,
  players,
  handleAddToTeam,
  opposingTeam,
  isDisabled
}) => {
  const updateTeamCaptain = useUpdateTeamCaptain();
  const { showToast } = useToast();

  // Encontrar o jogador que é capitão
  const captain = players.find(player => player.id === team?.captainId);

  const handleSetCaptain = async (playerSessionId: number) => {
    if (!team?.id || isDisabled) return;

    try {
      await updateTeamCaptain.mutateAsync({
        teamId: team.id,
        data: { playerSessionId },
      });
      
      showToast('Capitão definido com sucesso!', {
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erro ao definir capitão:', error);
      showToast('Erro ao definir capitão. Tente novamente.', {
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <S.TeamContainer>
      <S.TeamHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{team?.name || 'Time'}</span>
          {captain && captain.user && (
            <CaptainInfo>
              <FiStar size={12} />
              Capitão: {captain.user.name}
            </CaptainInfo>
          )}
        </div>
        <span>{players.length} jogadores</span>
      </S.TeamHeader>
      
      <S.TeamPlayerList>
        {players.length > 0 ? (
          players.map(player => (
            <S.TeamPlayerItem key={player.userId}>
              <PlayerItemContent>
                <S.PlayerInfo>
                  <S.PlayerAvatar>
                    {player.user?.name?.charAt(0).toUpperCase() || ''}
                  </S.PlayerAvatar>
                  <div>
                    <S.PlayerName>
                      {player.user?.name || 'Sem nome'}
                      {team?.captainId === player.id && (
                        <CaptainBadge>
                          <FiStar size={14} />
                          Capitão
                        </CaptainBadge>
                      )}
                    </S.PlayerName>
                    <S.PlayerPosition>{player.user?.position || 'Sem posição'}</S.PlayerPosition>
                  </div>
                </S.PlayerInfo>
                {team?.id && (
                  <PlayerActions>
                    {!(team.captainId === player.id) && opposingTeam && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAddToTeam(player.userId, opposingTeam.id)}
                        disabled={isDisabled}
                      >
                        Alterar time
                      </Button>
                    )}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleSetCaptain(player.id)}
                      disabled={team.captainId === player.id || isDisabled}
                    >
                      {team.captainId === player.id ? 'Capitão' : 'Definir como capitão'}
                    </Button>
                  </PlayerActions>
                )}
              </PlayerItemContent>
            </S.TeamPlayerItem>
          ))
        ) : (
          <S.EmptyTeamMessage>
            Adicione jogadores a este time
          </S.EmptyTeamMessage>
        )}
      </S.TeamPlayerList>
    </S.TeamContainer>
  );
};

export default TeamComponent; 