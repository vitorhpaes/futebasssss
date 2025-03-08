import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';
import { UserRole } from '../context/authStore';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

/**
 * Componente que protege rotas com base na autenticação
 * e na função/role do usuário
 */
const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se há restrição de roles e o usuário não tem a role permitida
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redireciona para uma página apropriada baseada na role do usuário
    return user.role === 'admin' 
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/player/dashboard" replace />;
  }

  // Caso o usuário tenha permissão, renderiza o conteúdo da rota (Outlet)
  return <Outlet />;
};

export default ProtectedRoute; 