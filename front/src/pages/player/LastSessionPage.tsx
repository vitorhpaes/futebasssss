import { useAuthStore } from '../../context/authStore';
import { useLastMatch } from '../../services/matches/matches.queries';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
} from './DashboardPage.styles';
import { Card, Flex, Text, Grid, Heading, Container, Section } from '@radix-ui/themes';
import { styled } from 'styled-components';

import {  FiUsers, FiAward } from 'react-icons/fi';
import { PlayerSessionCard } from '../../components/PlayerSessionCard';

const PageContainer = styled(Container)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ScoreCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.primary.light}30;
  padding: 1.5rem;
  text-align: center;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main}40;
  }
`;

const ScoreText = styled(Text)`
  font-size: 3.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.dark};
  line-height: 1;
`;

const TeamName = styled(Heading)`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
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
  const { logout } = useAuthStore();
  const { data: lastMatch, isLoading, error } = useLastMatch();

  const handleFavorite = (playerId: number) => {
    // TODO: Implementar lógica de favoritar jogador
    console.log('Favoritar jogador:', playerId);
  };

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
            {lastMatch.gameResult && (
            <Section>
              <SectionTitle size="4">
                <FiAward size={20} />
                Resultado
              </SectionTitle>
              <Grid columns="2" gap="4" mt="3" width="100%">
                <ScoreCard>
                  <TeamName size="2" align="center">
                    {lastMatch.gameResult.teamA?.name || 'Time A'}
                  </TeamName>
                  <ScoreText>
                    {lastMatch.gameResult.teamAScore || 0}
                  </ScoreText>
                </ScoreCard>
                <ScoreCard>
                  <TeamName size="2" align="center">
                    {lastMatch.gameResult.teamB?.name || 'Time B'}
                  </TeamName>
                  <ScoreText>
                    {lastMatch.gameResult.teamBScore || 0}
                  </ScoreText>
                </ScoreCard>
              </Grid>
            </Section>
          )}

          {lastMatch.playerSessions && lastMatch.playerSessions.length > 0 && (
            <Section>
              <SectionTitle size="4">
                <FiUsers size={20} />
                Jogadores da Partida
              </SectionTitle>
              <PlayersList direction="column" mt="3">
                {lastMatch.playerSessions.map((playerSession) => (
                  <PlayerSessionCard
                    key={playerSession.id}
                    user={playerSession.user}
                    goals={playerSession.goals ?? 0}
                    assists={playerSession.assists ?? 0}
                    favorites={playerSession.favorites ?? 0}
                    onFavorite={() => handleFavorite(playerSession.id)}
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