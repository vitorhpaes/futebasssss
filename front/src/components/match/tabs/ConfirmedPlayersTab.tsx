import React from 'react';
import { FiFilter, FiUserCheck } from 'react-icons/fi';
import Alert from '../../../components/ui/Alert';
import { PlayerSession } from '../../../services/player-sessions/player-sessions.interfaces';
import * as S from '../../../pages/admin/MatchManagePage.styles';
import TeamComponent from '../TeamComponent';
import { Team } from '../../../services/teams/teams.interfaces';

interface ConfirmedPlayersTabProps {
  filteredPlayers: PlayerSession[];
  teamAPlayers: PlayerSession[];
  teamBPlayers: PlayerSession[];
  unassignedPlayers: PlayerSession[];
  match: {
    teamA?: Team;
    teamB?: Team;
  };
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  handleAddToTeam: (userId: number, teamId: number | undefined) => void;
  renderFilterForm: () => React.ReactNode;
}

const ConfirmedPlayersTab: React.FC<ConfirmedPlayersTabProps> = ({
  filteredPlayers,
  teamAPlayers,
  teamBPlayers,
  unassignedPlayers,
  match,
  isFilterOpen,
  setIsFilterOpen,
  handleAddToTeam,
  renderFilterForm
}) => {
  return (
    <>
      <S.TabHeader>
        <S.TabTitleContainer>
          <FiUserCheck size={24} />
          <h2>Distribuição de Times</h2>
          {filteredPlayers.length > 0 && (
            <span>({filteredPlayers.length} jogadores)</span>
          )}
        </S.TabTitleContainer>

        <S.FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FiFilter size={16} />
          {isFilterOpen ? 'Ocultar Filtros' : 'Filtrar'}
        </S.FilterButton>
      </S.TabHeader>

      {isFilterOpen && renderFilterForm()}

      {filteredPlayers && filteredPlayers.length > 0 ? (
        <div>
          <S.TeamsGrid>
            <TeamComponent
              team={match.teamA}
              players={teamAPlayers}
            />
            <TeamComponent
              team={match.teamB}
              players={teamBPlayers}
            />
          </S.TeamsGrid>

          {unassignedPlayers.length > 0 && (
            <>
              <S.TabHeader style={{ marginTop: '32px' }}>
                <S.TabTitleContainer>
                  <h2>Jogadores sem time</h2>
                  <span>({unassignedPlayers.length})</span>
                </S.TabTitleContainer>
              </S.TabHeader>

              <S.UnassignedPlayersContainer>
                {unassignedPlayers.map(player => (
                  <S.UnassignedPlayer key={player.userId}>
                    <S.PlayerInfo>
                      <S.PlayerAvatar>
                        {player.user?.name?.charAt(0).toUpperCase() || ''}
                      </S.PlayerAvatar>
                      <div>
                        <S.PlayerName>{player.user?.name || 'Sem nome'}</S.PlayerName>
                        <S.PlayerPosition>{player.user?.position || 'Sem posição'}</S.PlayerPosition>
                      </div>
                    </S.PlayerInfo>
                    <S.PlayerActions>
                      <S.ConfirmButton
                        onClick={() => handleAddToTeam(player.userId, match.teamA?.id)}
                      >
                        {match.teamA?.name}
                      </S.ConfirmButton>
                      <S.ResenhaButton
                        onClick={() => handleAddToTeam(player.userId, match.teamB?.id)}
                      >
                        {match.teamB?.name}
                      </S.ResenhaButton>
                    </S.PlayerActions>
                  </S.UnassignedPlayer>
                ))}
              </S.UnassignedPlayersContainer>
            </>
          )}
        </div>
      ) : (
        <Alert
          type="info"
          title="Nenhum jogador confirmado"
          message="Nenhum jogador foi confirmado para o jogo ainda."
        />
      )}
    </>
  );
};

export default ConfirmedPlayersTab; 