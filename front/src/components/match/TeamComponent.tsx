import React from 'react';
import * as S from '../../pages/admin/MatchManagePage.styles';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';

interface MatchTeam {
  id?: number;
  name?: string;
  color?: string;
}

interface TeamComponentProps {
  team: MatchTeam | null | undefined;
  players: PlayerSession[];
  handleAddToTeam?: (userId: number, teamId: number | undefined) => void;
}

const TeamComponent: React.FC<TeamComponentProps> = ({ team, players }) => {
  return (
    <S.TeamContainer>
      <S.TeamHeader $color={team?.color}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <S.TeamColor $color={team?.color} style={{ width: '20px', height: '20px', border: `2px solid ${team?.color || '#ccc'}` }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{team?.name || 'Time'}</span>
        </div>
        <span>{players.length} jogadores</span>
      </S.TeamHeader>
      
      <S.TeamPlayerList>
        {players.length > 0 ? (
          players.map(player => (
            <S.TeamPlayerItem key={player.userId}>
              <S.PlayerInfo>
                <S.PlayerAvatar style={{ border: `2px solid ${team?.color || '#ccc'}` }}>
                  {player.user?.name?.charAt(0).toUpperCase() || ''}
                </S.PlayerAvatar>
                <div>
                  <S.PlayerName>{player.user?.name || 'Sem nome'}</S.PlayerName>
                  <S.PlayerPosition>{player.user?.position || 'Sem posição'}</S.PlayerPosition>
                </div>
              </S.PlayerInfo>
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