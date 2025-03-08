import styled from 'styled-components';
import LoginForm from '../../components/auth/LoginForm';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary.dark}20;
  background-image: linear-gradient(to bottom right, ${({ theme }) => theme.colors.primary.dark}30, ${({ theme }) => theme.colors.accent.dark}30);
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: 450px;
  margin: ${({ theme }) => theme.spacing[4]};
  border-top: 5px solid ${({ theme }) => theme.colors.primary.main};
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const AppTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const AppDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const PlayerBadge = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 0.9rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, redirectPath } = useAuthStore();

  useEffect(() => {
    // Redireciona usuários já autenticados
    if (isAuthenticated && user) {
      navigate(redirectPath || (user.role === 'admin' ? '/admin/dashboard' : '/player/dashboard'));
    }
  }, [isAuthenticated, user, navigate, redirectPath]);

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <AppTitle>Futebasssss</AppTitle>
          <PlayerBadge>Área de Jogadores</PlayerBadge>
          <AppDescription>
            Acesso para jogadores e participantes do sistema
          </AppDescription>
        </LogoContainer>
        <LoginForm role="player" redirectPath="/player/dashboard" />
        <FooterLink to="/admin/login">Acessar como administrador</FooterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 