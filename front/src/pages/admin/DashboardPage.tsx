import { useAuthStore } from '../../context/authStore';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
  WelcomeCard,
  WelcomeTitle,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel
} from './DashboardPage.styles';

const AdminDashboardPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard do Administrador</Title>
        <LogoutButton onClick={logout}>Sair</LogoutButton>
      </Header>

      <WelcomeCard>
        <WelcomeTitle>Bem-vindo, {user?.name}!</WelcomeTitle>
        <p>
          Este é o painel de administração do Futebasssss. Aqui você poderá gerenciar jogadores,
          partidas, estatísticas e configurações do sistema.
        </p>
      </WelcomeCard>

      <h3>Resumo do Sistema</h3>
      
      <StatsGrid>
        <StatCard>
          <StatValue>24</StatValue>
          <StatLabel>Jogadores Registrados</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>4</StatValue>
          <StatLabel>Times Ativos</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>12</StatValue>
          <StatLabel>Partidas Realizadas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>3</StatValue>
          <StatLabel>Partidas Agendadas</StatLabel>
        </StatCard>
      </StatsGrid>

      <h3>Atividade Recente</h3>
      <p>
        Conteúdo futuro do dashboard irá aparecer aqui. Implementação em progresso...
      </p>
    </DashboardContainer>
  );
};

export default AdminDashboardPage; 