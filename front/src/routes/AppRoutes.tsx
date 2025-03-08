import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/DashboardPage';
import PlayerDashboardPage from '../pages/player/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import { useAuthStore } from '../context/authStore';
import AuthenticatedLayout from '../components/layout/AuthenticatedLayout';

const AppRoutes = () => {
  const { isAuthenticated, user, redirectPath } = useAuthStore();
  console.log({user, isAuthenticated, redirectPath});
  // Função para redirecionar usuários logados com base na role e redirectPath
  const handleRoot = () => {
    if (!isAuthenticated || !user) return <Navigate to="/auth/login" />;
    return <Navigate to={redirectPath || (user.role === 'admin' ? '/admin/dashboard' : '/player/dashboard')} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz - redireciona com base no estado de autenticação */}
        <Route path="/" element={handleRoot()} />

        {/* Rotas de autenticação */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Rotas protegidas para administradores */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute allowedRoles={['admin']} />}
        >
          <Route element={<AuthenticatedLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="teams" element={<div>Página de Times (em construção)</div>} />
            <Route path="players" element={<div>Página de Jogadores (em construção)</div>} />
            <Route path="matches" element={<div>Página de Partidas (em construção)</div>} />
          </Route>
        </Route>

        {/* Rotas protegidas para jogadores */}
        <Route 
          path="/player" 
          element={<ProtectedRoute allowedRoles={['player']} />}
        >
          <Route element={<AuthenticatedLayout />}>
            <Route path="dashboard" element={<PlayerDashboardPage />} />
            <Route path="matches" element={<div>Minhas Partidas (em construção)</div>} />
            <Route path="stats" element={<div>Minhas Estatísticas (em construção)</div>} />
          </Route>
        </Route>

        {/* Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 