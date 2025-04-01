import React from 'react';
import { FiFilter, FiUsers } from 'react-icons/fi';
import Alert from '../../../components/ui/Alert';
import { PlayerSession } from '../../../services/player-sessions/player-sessions.interfaces';
import * as S from '../../../pages/admin/MatchManagePage.styles';
import PlayerItem from '../PlayerItem';

interface AllPlayersTabProps {
  filteredPlayers: PlayerSession[];
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  handleConfirmPlayer: (userId: number, willPlay: boolean) => void;
  handleTogglePlayerStatus: (userId: number, willPlay: boolean) => void;
  confirmPlayerMutation: { isPending: boolean };
  renderFilterForm: () => React.ReactNode;
}

const AllPlayersTab: React.FC<AllPlayersTabProps> = ({
  filteredPlayers,
  isFilterOpen,
  setIsFilterOpen,
  handleConfirmPlayer,
  handleTogglePlayerStatus,
  confirmPlayerMutation,
  renderFilterForm
}) => {
  return (
    <>
      <S.TabHeader>
        <S.TabTitleContainer>
          <FiUsers size={24} />
          <h2>Todos os Jogadores</h2>
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
        <S.PlayerList>
          {filteredPlayers.map((ps) => (
            <PlayerItem 
              key={ps.userId}
              ps={ps} 
              handleConfirmPlayer={handleConfirmPlayer}
              handleTogglePlayerStatus={handleTogglePlayerStatus}
              confirmPlayerMutation={confirmPlayerMutation}
            />
          ))}
        </S.PlayerList>
      ) : (
        <Alert
          type="info"
          title="Nenhum jogador encontrado"
          message="Nenhum jogador disponível com os filtros selecionados."
        />
      )}
    </>
  );
};

export default AllPlayersTab; 