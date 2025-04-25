import { useAuthStore } from '../../context/authStore';
import { useLastMatch } from '../../services/matches/matches.queries';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
} from './DashboardPage.styles';
import { Flex, Text, Heading, Container, Section } from '@radix-ui/themes';
import { styled } from 'styled-components';
import { FiUsers } from 'react-icons/fi';
import { PlayerSessionCard } from '../../components/PlayerSessionCard';
import { StatsForm } from '../../components/StatsForm';
import { useSessionFavorites } from '../../services/player-favorites/player-favorites.queries';

const PageContainer = styled(Container)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled(Heading)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin: 2rem 0 1rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const PlayersList = styled(Flex)`
  width: 100%;
  gap: 0.75rem;
`;

const LastSessionPage = () => {
  const { logout, user } = useAuthStore();
  const { data: lastMatch, isLoading, error } = useLastMatch();

  const { data: favorites } = useSessionFavorites(lastMatch?.id);


  const playerSession = lastMatch?.playerSessions?.find(
    playerSession => playerSession.user?.id === user?.id
  );

  const userFavoritePlayers = favorites?.filter(favorite => favorite.voterId === user?.id)

  const userFilledStats = !!playerSession?.statsSubmitted || !playerSession?.willPlay;

  return (
    <DashboardContainer>
      <Header>
        <Title>Última Partida</Title>
        <LogoutButton onClick={logout}>Sair</LogoutButton>
      </Header>

      {isLoading ? (
        <PageContainer>
          <Text size="3">Carregando...</Text>
        </PageContainer>
      ) : error ? (
        <PageContainer>
          <Text size="3" color="red">Erro ao carregar os dados da última partida</Text>
        </PageContainer>
      ) : !lastMatch ? (
        <PageContainer>
          <Text size="3">Nenhuma partida encontrada</Text>
        </PageContainer>
      ) : (
        <PageContainer>
          {!userFilledStats && playerSession && (
            <StatsForm playerSessionId={playerSession.id} />
          )}

          {userFilledStats && lastMatch.playerSessions && lastMatch.playerSessions.length > 0 && (
            <Section>
              <SectionTitle size="4">
                <FiUsers size={20} />
                Jogadores da Partida
              </SectionTitle>
              <PlayersList direction="column" mt="3">
                {lastMatch.playerSessions.map((playerSession) => (
                  <PlayerSessionCard
                    key={playerSession.id}
                    user={playerSession.user!}
                    sessionId={lastMatch.id}
                    goals={playerSession.goals ?? 0}
                    assists={playerSession.assists ?? 0}
                    favoritesCount={playerSession.favoritesCount ?? 0}
                    isFavorite={userFavoritePlayers?.some(favorite => favorite.favoriteId === playerSession.user?.id)}
                    favoriteId={userFavoritePlayers?.find(favorite => favorite.favoriteId === playerSession.user?.id)?.id}
                  />
                ))}
              </PlayersList>
            </Section>
          )}
        </PageContainer>
      )}
    </DashboardContainer>
  );
};

export default LastSessionPage; 