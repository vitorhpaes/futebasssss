import React from 'react';
import { FiFilter, FiUserCheck } from 'react-icons/fi';
import Alert from '../../../components/ui/Alert';
import { PlayerSession } from '../../../services/player-sessions/player-sessions.interfaces';
import * as S from '../../../pages/admin/MatchManagePage.styles';
import TeamComponent from '../TeamComponent';

interface MatchTeam {
  id?: number;
  sessionId?: number;
  name?: string;
  color?: string;
}

interface ConfirmedPlayersTabProps {
  filteredPlayers: PlayerSession[];
  teamAPlayers: PlayerSession[];
  teamBPlayers: PlayerSession[];
  unassignedPlayers: PlayerSession[];
  match: {
    teamA?: MatchTeam;
    teamB?: MatchTeam;
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <S.SectionTitle>
          <FiUserCheck size={16} style={{ marginRight: '8px' }} />
          Distribuição de Times 
          {filteredPlayers.length > 0 && (
            <span style={{ fontWeight: 'normal', fontSize: '14px', marginLeft: '8px' }}>
              ({filteredPlayers.length} jogadores confirmados)
            </span>
          )}
        </S.SectionTitle>
        
        <S.ConfirmButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FiFilter size={16} />
          {isFilterOpen ? 'Ocultar Filtros' : 'Filtrar'}
        </S.ConfirmButton>
      </div>

      {isFilterOpen && renderFilterForm()}

      {filteredPlayers && filteredPlayers.length > 0 ? (
        <div>
          <S.TeamsGrid>
            <TeamComponent 
              team={match.teamA} 
              players={teamAPlayers}
              handleAddToTeam={handleAddToTeam}
            />
            <TeamComponent 
              team={match.teamB} 
              players={teamBPlayers}
              handleAddToTeam={handleAddToTeam}
            />
          </S.TeamsGrid>
          
          {unassignedPlayers.length > 0 && (
            <>
              <S.SectionTitle style={{ marginTop: '32px', marginBottom: '16px' }}>
                Jogadores sem time ({unassignedPlayers.length})
              </S.SectionTitle>
              
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