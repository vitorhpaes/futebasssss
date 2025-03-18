import React from 'react';
import { FiFilter, FiCoffee } from 'react-icons/fi';
import Alert from '../../../components/ui/Alert';
import { PlayerSession } from '../../../services/player-sessions/player-sessions.interfaces';
import * as S from '../../../pages/admin/MatchManagePage.styles';
import PlayerItem from '../PlayerItem';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <S.SectionTitle>
          <FiCoffee size={16} style={{ marginRight: '8px' }} />
          Jogadores na Resenha 
          {filteredPlayers.length > 0 && (
            <span style={{ fontWeight: 'normal', fontSize: '14px', marginLeft: '8px' }}>
              ({filteredPlayers.length} encontrados)
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