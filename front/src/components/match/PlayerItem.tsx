import React from 'react';
import { FiCheckCircle, FiCoffee } from 'react-icons/fi';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';
import * as S from '../../pages/admin/MatchManagePage.styles';

interface PlayerItemProps {
  ps: PlayerSession;
  handleConfirmPlayer: (userId: number, willPlay: boolean) => void;
  handleTogglePlayerStatus: (userId: number, willPlay: boolean) => void;
  confirmPlayerMutation: { isPending: boolean };
}

const PlayerItem: React.FC<PlayerItemProps> = ({ 
  ps, 
  handleConfirmPlayer, 
  handleTogglePlayerStatus,
  confirmPlayerMutation 
}) => {
  const isConfirmed = ps.confirmed;
  const isResenha = ps.confirmed && !ps.willPlay;

  return (
    <S.PlayerItem key={ps.userId} $resenha={isResenha}>
      <S.PlayerInfo>
        <S.PlayerAvatar $resenha={isResenha}>
          {ps.user?.name?.charAt(0).toUpperCase() || ''}
        </S.PlayerAvatar>
        <div>
          <S.PlayerName>{ps.user?.name || 'Sem nome'}</S.PlayerName>
          <S.PlayerPosition>
            {ps.user?.position || 'Sem posição'}
          </S.PlayerPosition>
        </div>
      </S.PlayerInfo>
      <S.ActionSection>
        {(isConfirmed) ? (
          // Se já está confirmado, mostrar status e botão para alternar
          <>
            <S.PlayerStatus 
              $confirmed={isConfirmed} 
              $resenha={isResenha}
            >
              {isResenha ? 'Resenha' : 'Confirmado'}
            </S.PlayerStatus>
            
            {/* Botão para alternar entre jogo e resenha */}
            {isResenha ? (
              <S.ConfirmButton 
                onClick={() => handleTogglePlayerStatus(ps.userId, true)}
                disabled={confirmPlayerMutation.isPending}
                style={{ 
                  marginLeft: '8px',
                  fontSize: '12px',
                  padding: '4px 8px'
                }}
              >
                <FiCheckCircle size={12} />
                Jogar
              </S.ConfirmButton>
            ) : (
              <S.ResenhaButton 
                onClick={() => handleTogglePlayerStatus(ps.userId, false)}
                disabled={confirmPlayerMutation.isPending}
                style={{ 
                  marginLeft: '8px',
                  fontSize: '12px',
                  padding: '4px 8px'
                }}
              >
                <FiCoffee size={12} />
                Resenha
              </S.ResenhaButton>
            )}
          </>
        ) : (
          // Se não está confirmado, mostrar botões de confirmação
          <S.PlayerActions>
            <S.ConfirmButton 
              onClick={() => handleConfirmPlayer(ps.userId, true)}
              disabled={confirmPlayerMutation.isPending}
              style={confirmPlayerMutation.isPending ? { cursor: 'wait', opacity: 0.7 } : {}}
            >
              <FiCheckCircle size={14} />
              {confirmPlayerMutation.isPending ? 'Processando...' : 'Confirmado'}
            </S.ConfirmButton>
            <S.ResenhaButton 
              onClick={() => handleConfirmPlayer(ps.userId, false)}
              disabled={confirmPlayerMutation.isPending}
              style={confirmPlayerMutation.isPending ? { cursor: 'wait', opacity: 0.7 } : {}}
            >
              <FiCoffee size={14} />
              {confirmPlayerMutation.isPending ? 'Processando...' : 'Resenha'}
            </S.ResenhaButton>
          </S.PlayerActions>
        )}
      </S.ActionSection>
    </S.PlayerItem>
  );
};

export default PlayerItem; 