import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuthStore } from '../../context/authStore';
import {
  LoginContainer,
  LoginCard,
  LogoContainer,
  AppTitle,
  AdminBadge,
  AppDescription,
  FooterLink
} from './AdminLoginPage.styles';

const AdminLoginPage = () => {
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
          <AdminBadge>Área Administrativa</AdminBadge>
          <AppDescription>
            Acesso restrito para administradores do sistema
          </AppDescription>
        </LogoContainer>
        <LoginForm role="admin" redirectPath="/admin/dashboard" />
        <FooterLink to="/auth/login">Voltar para o login de jogadores</FooterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLoginPage; 