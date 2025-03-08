import styled from 'styled-components';
import LoginForm from '../../components/auth/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: 450px;
  margin: ${({ theme }) => theme.spacing[4]};
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

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Redireciona usuários já autenticados para a página apropriada
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/player/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <AppTitle>FuteBass</AppTitle>
          <AppDescription>
            Gerencie suas peladas de futebol com inteligência artificial
          </AppDescription>
        </LogoContainer>
        <LoginForm />
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 