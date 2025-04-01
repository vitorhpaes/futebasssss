import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { GiBeerStein } from 'react-icons/gi';
import { PlayerSession } from '../../../services/player-sessions/player-sessions.interfaces';
import * as S from '../../../pages/admin/MatchManagePage.styles';
import PlayerItem from '../PlayerItem';
import Alert from '../../../components/ui/Alert';

interface ResenhaTabProps {
  filteredPlayers: PlayerSession[];
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  handleConfirmPlayer: (userId: number, willPlay: boolean) => void;
  handleTogglePlayerStatus: (userId: number, willPlay: boolean) => void;
  confirmPlayerMutation: { isPending: boolean };
  renderFilterForm: () => React.ReactNode;
}

const ResenhaTab: React.FC<ResenhaTabProps> = ({
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
          <GiBeerStein size={24} />
          <h2>Resenha</h2>
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
          title="Nenhum jogador na resenha"
          message="Nenhum jogador confirmado para resenha com os filtros selecionados."
        />
      )}
    </>
  );
};

export default ResenhaTab; 