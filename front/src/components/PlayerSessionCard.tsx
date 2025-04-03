import { Card, Text, Box, Button } from '@radix-ui/themes';
import { FiStar, FiAward, FiTarget, FiHeart } from 'react-icons/fi';
import { styled } from 'styled-components';

const StyledCard = styled(Card)`
  margin: 0.5rem 0;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  border-radius: 12px;
  border: 1px solid var(--violet-5);
  box-shadow: 0 2px 8px rgba(167, 139, 250, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:hover {
    transform: translateY(-2px);
    border-color: var(--violet-6);
    box-shadow: 0 4px 16px rgba(167, 139, 250, 0.15);
  }
`;

const StatContainer = styled(Box)`
  gap: 1rem;
  margin-top: 0.5rem;
  display: flex;
`;

const StatItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  background-color: var(--violet-2);
  border: 1px solid var(--violet-4);
  
  svg {
    color: var(--violet-9);
  }

  &:hover {
    background-color: var(--violet-3);
    transform: translateY(-1px);
  }
`;

const FavoriteButton = styled(Button)`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  
  &:hover {
    background-color: var(--amber-3);
    
    svg {
      color: var(--amber-9);
      transform: scale(1.1);
    }
  }
  
  svg {
    transition: all 0.2s ease-in-out;
  }
`;

interface PlayerSessionCardProps {
  user: {
    name: string;
  };
  goals: number;
  assists: number;
  favorites: number;
  onFavorite: () => void;
}

export const PlayerSessionCard = ({
  user,
  goals,
  assists,
  favorites,
  onFavorite,
}: PlayerSessionCardProps) => {
  return (
    <StyledCard>
      <Box>
        <Text size="4" weight="bold" mb="1" style={{ color: 'var(--violet-11)' }}>
          {user.name}
        </Text>
        <StatContainer>
          <StatItem>
            <FiTarget size={16} />
            <Text size="2" weight="medium">
              {goals} gols
            </Text>
          </StatItem>
          <StatItem>
            <FiAward size={16} />
            <Text size="2" weight="medium">
              {assists} assists
            </Text>
          </StatItem>
          <StatItem>
            <FiHeart size={16} />
            <Text size="2" weight="medium">
              {favorites} favs
            </Text>
          </StatItem>
        </StatContainer>
      </Box>
      <FavoriteButton variant="ghost" onClick={onFavorite}>
        <FiStar size={22} />
      </FavoriteButton>
    </StyledCard>
  );
}; 