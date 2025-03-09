import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuthStore } from '../../context/authStore';
import {
  LoginContainer,
  LoginCard,
  LogoContainer,
  AppTitle,
  PlayerBadge,
  AppDescription,
  FooterLink
} from './LoginPage.styles';

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