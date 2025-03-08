import styled from 'styled-components';
import { useAuthStore } from '../../context/authStore';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error.main};
  border: 1px solid ${({ theme }) => theme.colors.error.main};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: white;
  }
`;

const WelcomeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const WelcomeTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

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