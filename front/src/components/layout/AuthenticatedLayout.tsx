import { ReactNode } from 'react';
import MainNavigation from '../navigation/MainNavigation';
import { Outlet } from 'react-router-dom';
import { LayoutContainer, MainContent, Footer } from './AuthenticatedLayout.styles';

interface AuthenticatedLayoutProps {
  children?: ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <LayoutContainer>
      <MainNavigation />
      <MainContent>
        {children || <Outlet />}
      </MainContent>
      <Footer>
        &copy; {new Date().getFullYear()} Futebasssss - Todos os direitos reservados
      </Footer>
    </LayoutContainer>
  );
};

export default AuthenticatedLayout; 