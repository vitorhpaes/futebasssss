import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import AdminDashboardPage from '../pages/admin/DashboardPage';
import PlayerDashboardPage from '../pages/player/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import { useAuthStore } from '../context/authStore';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Função para redirecionar usuários logados com base na role
  const handleRoot = () => {
    if (!isAuthenticated || !user) return <Navigate to="/auth/login" />;
    
    return user.role === 'admin' 
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/player/dashboard" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz - redireciona com base no estado de autenticação */}
        <Route path="/" element={handleRoot()} />

        {/* Rotas de autenticação */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Rotas protegidas para administradores */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute allowedRoles={['admin']} />}
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          {/* Adicione mais rotas de admin aqui no futuro */}
        </Route>

        {/* Rotas protegidas para jogadores */}
        <Route 
          path="/player" 
          element={<ProtectedRoute allowedRoles={['player']} />}
        >
          <Route path="dashboard" element={<PlayerDashboardPage />} />
          {/* Adicione mais rotas de player aqui no futuro */}
        </Route>

        {/* Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 