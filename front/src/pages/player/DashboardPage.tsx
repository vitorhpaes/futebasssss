import { useAuthStore } from '../../context/authStore';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
  WelcomeCard,
  WelcomeTitle
} from './DashboardPage.styles';

const PlayerDashboardPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard do Jogador</Title>
        <LogoutButton onClick={logout}>Sair</LogoutButton>
      </Header>

      <WelcomeCard>
        <WelcomeTitle>Bem-vindo, {user?.name}!</WelcomeTitle>
        <p>
          Este é o painel do jogador do Futebasssss. Aqui você poderá ver suas estatísticas,
          partidas passadas e futuras, além de confirmar sua participação em eventos.
        </p>
      </WelcomeCard>

      <p>
        Conteúdo futuro do dashboard irá aparecer aqui. Implementação em progresso...
      </p>
    </DashboardContainer>
  );
};

export default PlayerDashboardPage; 