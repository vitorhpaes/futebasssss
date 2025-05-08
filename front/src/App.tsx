import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './theme/ThemeProvider';
import { ToastProvider } from './components/ui/Toast';
import AppRoutes from './routes/AppRoutes';
import '@radix-ui/themes/styles.css'

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Desabilita refetch automático ao focar a janela
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1, // Tenta uma vez novamente em caso de erro
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
