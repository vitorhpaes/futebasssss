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
          Este é o painel do jogador do FuteBass. Aqui você poderá ver suas estatísticas,
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