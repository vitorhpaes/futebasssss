import { Card, Text, Box, Button } from '@radix-ui/themes';
import { FiStar, FiAward, FiTarget, FiHeart } from 'react-icons/fi';
import { styled } from 'styled-components';

const StyledCard = styled(Card)`
  margin: 0.5rem 0;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.primary.light}40;
  box-shadow: ${({ theme }) => theme.shadows.small};
  width: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

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

const CircleInitial = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ theme }) => theme.colors.primary.light}20;
  border: 2px solid ${({ theme }) => theme.colors.primary.main}40;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.dark};
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
`;

const StatContainer = styled(Box)`
  display: flex;
  gap: 0.5rem;
  margin-left: 52px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    margin-left: 46px;
    gap: 0.35rem;
  }

  @media (max-width: 360px) {
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;

const StatItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary.light}15;
  border: 1px solid ${({ theme }) => theme.colors.primary.light}30;
  
  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light}25;
  }

  @media (max-width: 480px) {
    padding: 0.2rem 0.4rem;
    gap: 0.3rem;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const FavoriteButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.accent.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.light}20;
    
    svg {
      transform: scale(1.1);
    }
  }
  
  svg {
    transition: transform 0.2s ease-in-out;
  }

  @media (max-width: 480px) {
    top: 0.75rem;
    right: 0.75rem;
    width: 28px;
    height: 28px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const PlayerName = styled(Text)`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};

  @media (max-width: 480px) {
    font-size: 0.95rem;
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
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <StyledCard>
      <PlayerInfo>
        <CircleInitial>
          {getInitials(user.name)}
        </CircleInitial>
        <Box style={{ minWidth: 0 }}>
          <PlayerName as="div">
            {user.name}
          </PlayerName>
        </Box>
      </PlayerInfo>

      <StatContainer>
        <StatItem>
          <FiTarget size={14} />
          <Text size="1" weight="medium">
            {goals} gols
          </Text>
        </StatItem>
        <StatItem>
          <FiAward size={14} />
          <Text size="1" weight="medium">
            {assists} assists
          </Text>
        </StatItem>
        <StatItem>
          <FiHeart size={14} />
          <Text size="1" weight="medium">
            {favorites} favs
          </Text>
        </StatItem>
      </StatContainer>

      <FavoriteButton variant="ghost" onClick={onFavorite}>
        <FiStar size={18} />
      </FavoriteButton>
    </StyledCard>
  );
}; 