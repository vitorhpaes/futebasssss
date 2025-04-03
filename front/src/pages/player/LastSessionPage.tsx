import { useAuthStore } from '../../context/authStore';
import { useLastMatch } from '../../services/matches/matches.queries';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
} from './DashboardPage.styles';
import { Card, Flex, Text, Box, Grid, Heading, Badge } from '@radix-ui/themes';
import { styled } from 'styled-components';
import dayjs from 'dayjs';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { PlayerSessionCard } from '../../components/PlayerSessionCard';

const StyledCard = styled(Card)`
  margin: 1rem 0;
  width: 100%;
`;

const IconWrapper = styled(Flex)`
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const ContentBox = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
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
        <Text>Carregando...</Text>
      ) : error ? (
        <Text color="red">Erro ao carregar os dados da última partida</Text>
      ) : !lastMatch ? (
        <Text>Nenhuma partida encontrada</Text>
      ) : (
        <ContentBox>
          <StyledCard>
            <Flex direction="column" gap="3">
              <Badge
                color={lastMatch.status === 'COMPLETED' ? 'green' : lastMatch.status === 'CANCELED' ? 'red' : 'blue'}
                size="2"
              >
                {lastMatch.status === 'COMPLETED' ? 'Finalizada' : lastMatch.status === 'CANCELED' ? 'Cancelada' : 'Agendada'}
              </Badge>

              <IconWrapper>
                <FiCalendar />
                <Text>{dayjs(lastMatch.date).format('DD/MM/YYYY [às] HH:mm')}</Text>
              </IconWrapper>

              <IconWrapper>
                <FiMapPin />
                <Text>{lastMatch.location}</Text>
              </IconWrapper>

              {lastMatch.gameResult && (
                <Box>
                  <Heading size="4" mb="2">Resultado</Heading>
                  <Grid columns="2" gap="3" width="100%">
                    <Card>
                      <Flex direction="column" align="center" gap="2">
                        <Heading size="3">{lastMatch.gameResult.teamA?.name || 'Time A'}</Heading>
                        <Text size="8" weight="bold">{lastMatch.gameResult.teamAScore || 0}</Text>
                      </Flex>
                    </Card>
                    <Card>
                      <Flex direction="column" align="center" gap="2">
                        <Heading size="3">{lastMatch.gameResult.teamB?.name || 'Time B'}</Heading>
                        <Text size="8" weight="bold">{lastMatch.gameResult.teamBScore || 0}</Text>
                      </Flex>
                    </Card>
                  </Grid>
                </Box>
              )}

              {lastMatch.playerSessions && lastMatch.playerSessions.length > 0 && (
                <Box>
                  <Heading size="4" mb="2">
                    <Text ml='2'>Jogadores Participantes</Text>
                  </Heading>
                  <Flex direction="column" gap="2">
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
                  </Flex>
                </Box>
              )}

              {lastMatch.notes && (
                <Box>
                  <Text size="2" color="gray">
                    {lastMatch.notes}
                  </Text>
                </Box>
              )}
            </Flex>
          </StyledCard>
        </ContentBox>
      )}
    </DashboardContainer>
  );
};

export default LastSessionPage; 