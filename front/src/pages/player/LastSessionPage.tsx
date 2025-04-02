import { useAuthStore } from '../../context/authStore';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
  WelcomeCard,
  WelcomeTitle
} from './DashboardPage.styles';

const LastSessionPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <DashboardContainer>
      <Header>
        <Title>Última Sessão</Title>
        <LogoutButton onClick={logout}>Sair</LogoutButton>
      </Header>

      <WelcomeCard>
        <WelcomeTitle>Bem-vindo, {user?.name}!</WelcomeTitle>
        <p>
          Aqui você encontrará informações sobre sua última sessão de jogo,
          incluindo estatísticas, desempenho e destaques da partida.
        </p>
      </WelcomeCard>

      <p>
        Conteúdo da última sessão será exibido aqui...
      </p>
    </DashboardContainer>
  );
};

export default LastSessionPage; 