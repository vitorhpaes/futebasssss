import { Card, Text, Box, Flex } from '@radix-ui/themes';
import { FiAward, FiTarget } from 'react-icons/fi';
import { styled } from 'styled-components';
import { useCreatePlayerFavorite, useDeletePlayerFavorite, useSessionFavorites } from '../services/player-favorites/player-favorites.queries';
import { useAuthStore } from '../context/authStore';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToast } from './ui/Toast';
import { Oval } from 'react-loader-spinner';


const StyledCard = styled(Card)`
  margin: 0.5rem 0;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.primary.light}40;
  box-shadow: ${({ theme }) => theme.shadows.small};
  width: 100%;
  position: relative;

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin: 0.35rem 0;
  }
`;

const PlayerInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
`;

const StatContainer = styled(Flex)`
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.35rem;
  }

  @media (max-width: 360px) {
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;

const StatItem = styled(Flex)`
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary.light}15;
  border: 1px solid ${({ theme }) => theme.colors.primary.light}30;
  
  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: 480px) {
    padding: 0.2rem 0.4rem;
    gap: 0.3rem;
  }
`;

interface PlayerSessionCardProps {
  user: {
    id: number;
    name: string;
  };
  sessionId: number;
  goals: number;
  assists: number;
  favoritesCount: number;
  isFavorite?: boolean
  favoriteId?: number
}

export const PlayerSessionCard = ({
  user,
  sessionId,
  goals,
  assists,
  favoritesCount: favoritesCount,
  isFavorite,
  favoriteId,
}: PlayerSessionCardProps) => {
  const { user: loggedUser } = useAuthStore();
  const { mutate: createFavorite, isPending } = useCreatePlayerFavorite();
  const { mutate: deleteFavorite } = useDeletePlayerFavorite();
  const { showToast } = useToast();

  const { data: favorites } = useSessionFavorites(sessionId);

  const loggedUserFavoritesCount = favorites?.filter(favorite => favorite.voterId === loggedUser?.id)?.length || 0;  

  const handleFavorite = () => {
    if (!loggedUser) {
      showToast('Você precisa estar logado para favoritar um jogador.', {
        type: 'error',
        duration: 5000
      });
      return;
    }

    if(loggedUser.id === user.id) {
      showToast('Você não pode favoritar a si mesmo.', {
        type: 'error',
        duration: 5000
      });
      return
    }


    if (loggedUserFavoritesCount >= 5) {
      showToast('Você já favoritou 5 jogadores nesta partida.', {
        type: 'error',
        duration: 5000
      });
      return
    }

    createFavorite(
      {
        sessionId,
        voterId: loggedUser.id,
        favoriteId: user.id,
      },
      {
        onSuccess: () => {
          showToast('Jogador favoritado com sucesso!', {
            type: 'success',
            duration: 3000
          });
        },
        onError: () => {
          showToast('Erro ao favoritar jogador. Tente novamente.', {
            type: 'error',
            duration: 5000
          });
        }
      }
    );
  };

  const handleDeleteFavorite = (favoriteId: number) => {
    if (!loggedUser) {
      showToast('Você precisa estar logado para desfavoritar um jogador.', {
        type: 'error',
        duration: 5000
      });
      return;
    }

    deleteFavorite(favoriteId, {
      onSuccess: () => {
        showToast('Jogador desfavoritado com sucesso!', {
          type: 'success',
          duration: 3000
        });
      },
      onError: () => {
        showToast('Erro ao desfavoritar jogador. Tente novamente.', {
          type: 'error',
          duration: 5000
        });
      }
    });
  };

  return (
    <StyledCard>
      <PlayerInfo>
        <Box style={{ minWidth: 0 }}>
          <Text as="div" size='4' weight={'bold'}>
            {user.name}
          </Text>
        </Box>
      </PlayerInfo>

      <StatContainer justify={'between'} >
        <StatItem>
          <FiTarget size={14} />
          <Text size="3" weight="light">
            {goals} gols
          </Text>
        </StatItem>
        <StatItem>
          <FiAward size={18} />
          <Text size="3" weight="light">
            {assists} assists
          </Text>
        </StatItem>
        <StatItem onClick={isFavorite ? () => handleDeleteFavorite(favoriteId!) : handleFavorite}>
          {isFavorite && !isPending ? <FaHeart size={18} /> : !isPending ? <FaRegHeart size={18} /> : <Oval height={14} width={14} />}
          <Text size="3" weight="light">
            {favoritesCount} favs
          </Text>
        </StatItem>
      </StatContainer>
    </StyledCard>
  );
}; 