import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/DashboardPage';
import PlayerListPage from '../pages/admin/PlayerListPage';
import PlayerCreatePage from '../pages/admin/PlayerCreatePage';
import PlayerDashboardPage from '../pages/player/DashboardPage';
import MatchListPage from '../pages/admin/MatchListPage';
import MatchCreatePage from '../pages/admin/MatchCreatePage';
import ProtectedRoute from './ProtectedRoute';
import { useAuthStore } from '../context/authStore';
import AuthenticatedLayout from '../components/layout/AuthenticatedLayout';
import PlayerEditPage from '../pages/admin/PlayerEditPage';
import MatchManagePage from '../pages/admin/MatchManagePage';


const AppRoutes = () => {
  const { isAuthenticated, user, redirectPath } = useAuthStore();

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
            {/* Rotas de gerenciamento de jogadores */}
            <Route path="players" element={<PlayerListPage />} />
            <Route path="players/create" element={<PlayerCreatePage />} />
            <Route path="players/edit/:id" element={<PlayerEditPage />} />
            <Route path="matches" element={<MatchListPage />} />
            <Route path="matches/create" element={<MatchCreatePage />} />
            <Route path="matches/manage/:id" element={<MatchManagePage />} />
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