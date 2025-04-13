import React from 'react';
import * as S from '../../pages/admin/MatchManagePage.styles';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';
import { Button } from '../ui/Button';

interface PlayerListItemProps {
  player: PlayerSession;
  onConfirm: (userId: number, willPlay?: boolean) => void;
  onToggleStatus: (userId: number, willPlay?: boolean) => void;
  isLoading?: boolean;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({
  player,
  onConfirm,
  onToggleStatus,
  isLoading
}) => {
  const isConfirmed = player.confirmed;
  const isResenha = isConfirmed && !player.willPlay;

  return (
    <S.PlayerItem $resenha={isResenha}>
      <S.PlayerInfo>
        <S.PlayerAvatar $resenha={isResenha}>
          {player.user?.name?.charAt(0).toUpperCase() || ''}
        </S.PlayerAvatar>
        <div>
          <S.PlayerName>{player.user?.name || 'Sem nome'}</S.PlayerName>
          <S.PlayerPosition>{player.user?.position || 'Sem posição'}</S.PlayerPosition>
        </div>
      </S.PlayerInfo>

      <S.PlayerActions>
        {!isConfirmed ? (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConfirm(player.userId, true)}
              disabled={isLoading}
            >
              Confirmar Jogo
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={() => onConfirm(player.userId, false)}
              disabled={isLoading}
            >
              Confirmar Resenha
            </Button>
          </>
        ) : (
          <Button
            variant={isResenha ? "primary" : "warning"}
            size="sm"
            onClick={() => onToggleStatus(player.userId, !isResenha)}
            disabled={isLoading}
          >
            {isResenha ? 'Mover para Jogo' : 'Mover para Resenha'}
          </Button>
        )}
      </S.PlayerActions>
    </S.PlayerItem>
  );
};

export default PlayerListItem; 