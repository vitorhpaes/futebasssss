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
          Este é o painel de administração do FuteBass. Aqui você poderá gerenciar jogadores,
          partidas, estatísticas e configurações do sistema.
        </p>
      </WelcomeCard>

      <p>
        Conteúdo futuro do dashboard irá aparecer aqui. Implementação em progresso...
      </p>
    </DashboardContainer>
  );
};

export default AdminDashboardPage; 