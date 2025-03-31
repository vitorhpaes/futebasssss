import React, { useState } from 'react';
import { GiBeerStein } from 'react-icons/gi';
import { useConfirmPlayer } from '../../../services/player-sessions/useConfirmPlayer';
import { useTogglePlayerStatus } from '../../../services/player-sessions/useTogglePlayerStatus';
import { useFilteredPlayers } from '../../../services/player-sessions/useFilteredPlayers';
import PlayerListItem from '../PlayerListItem';
import { TabHeader, TabTitleContainer, FilterButton } from '../../../pages/admin/MatchManagePage.styles';
import { PlayerSession } from '../../../services/player-sessions/player-sessions.interfaces';

interface ResenhaTabProps {
  renderFilterForm: () => React.ReactNode;
}

const ResenhaTab: React.FC<ResenhaTabProps> = ({ renderFilterForm }) => {
  const [showConfirmed, setShowConfirmed] = useState(false);
  const { data: players = [] } = useFilteredPlayers({ willPlay: false });
  const confirmPlayerMutation = useConfirmPlayer();
  const togglePlayerStatusMutation = useTogglePlayerStatus();

  const handleConfirmPlayer = (userId: number, willPlay?: boolean) => {
    confirmPlayerMutation.mutate({ userId, willPlay });
  };

  const handleToggleStatus = (userId: number, willPlay?: boolean) => {
    togglePlayerStatusMutation.mutate({ userId, willPlay });
  };

  const handleFilterClick = () => {
    setShowConfirmed(!showConfirmed);
  };

  const filteredPlayers = players.filter((player: PlayerSession) => 
    showConfirmed ? player.confirmed : !player.confirmed
  );

  return (
    <div>
      <TabHeader>
        <TabTitleContainer>
          <GiBeerStein size={24} />
          <h2>Resenha</h2>
          <span>({filteredPlayers.length})</span>
        </TabTitleContainer>
        <FilterButton onClick={handleFilterClick}>
          {showConfirmed ? 'Mostrar Não Confirmados' : 'Mostrar Confirmados'}
        </FilterButton>
      </TabHeader>

      {renderFilterForm()}

      {filteredPlayers.map((player: PlayerSession) => (
        <PlayerListItem
          key={player.userId}
          player={player}
          onConfirm={handleConfirmPlayer}
          onToggleStatus={handleToggleStatus}
          isLoading={confirmPlayerMutation.isLoading || togglePlayerStatusMutation.isLoading}
        />
      ))}
    </div>
  );
};

export default ResenhaTab; 