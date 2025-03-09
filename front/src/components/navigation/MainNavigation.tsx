import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';
import { useTheme } from '../../theme/ThemeProvider';
import { useState } from 'react';

const NavContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  }
`;

const LogoLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: 768px) {
    margin-right: ${({ theme }) => theme.spacing[2]};
    font-size: 1.3rem;
  }
`;

const NavMenuRoot = styled(NavigationMenu.Root)`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  flex: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled(NavigationMenu.List)`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavItem = styled(NavigationMenu.Item)`
  margin-right: ${({ theme }) => theme.spacing[4]};
`;

interface NavLinkProps {
  $active?: boolean;
}

const NavLink = styled(NavigationMenu.Link)<NavLinkProps>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.main : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  text-decoration: none;
  transition: all 0.2s ease;
  
  ${({ $active, theme }) => 
    $active && 
    css`
      background-color: ${theme.colors.primary.main}10;
      border-bottom: 2px solid ${theme.colors.primary.main};
    `}
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-left: auto;
  }
`;

const UserName = styled.span`
  margin-right: ${({ theme }) => theme.spacing[3]};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  margin-right: ${({ theme }) => theme.spacing[4]};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }
  
  @media (max-width: 768px) {
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const UserMenuTrigger = styled(DropdownMenu.Trigger)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const UserMenuContent = styled(DropdownMenu.Content)`
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing[2]};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 100;
`;

const MenuItem = styled(DropdownMenu.Item)`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.primary.main}10;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const LogoutMenuItem = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.error.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.main}10;
    color: ${({ theme }) => theme.colors.error.main};
  }
`;

const SeparatorItem = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutral.light};
  margin: ${({ theme }) => theme.spacing[1]} 0;
`;

// Componentes para menu móvel
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing[1]};
  margin-right: ${({ theme }) => theme.spacing[2]};
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface MobileMenuContainerProps {
  $isOpen: boolean;
}

const MobileMenuContainer = styled.div<MobileMenuContainerProps>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.background.paper};
    z-index: 99;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform 0.3s ease;
    padding: ${({ theme }) => theme.spacing[4]};
    overflow-y: auto;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

interface MobileNavLinkProps {
  $active?: boolean;
}

const MobileNavLink = styled(Link)<MobileNavLinkProps>`
  display: block;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.main : theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  text-decoration: none;
  transition: all 0.2s ease;
  ${({ $active, theme }) => 
    $active && 
    css`
      background-color: ${theme.colors.primary.main}10;
      border-left: 4px solid ${theme.colors.primary.main};
    `}
`;

const MobileUserSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const MobileAvatar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing[3]};
`;

const MobileUserName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
`;

const MainNavigation = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  
  // Links de navegação baseados no tipo de usuário
  const navLinks = isAdmin
    ? [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/teams', label: 'Times' },
        { to: '/admin/players', label: 'Jogadores' },
        { to: '/admin/matches', label: 'Partidas' },
      ]
    : [
        { to: '/player/dashboard', label: 'Dashboard' },
        { to: '/player/matches', label: 'Minhas Partidas' },
        { to: '/player/stats', label: 'Estatísticas' },
      ];
  
  // Fecha o menu móvel quando um link é clicado
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <NavContainer>
      <NavInner>
        <MobileMenuButton 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu de navegação"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        
        <LogoLink to={isAdmin ? '/admin/dashboard' : '/player/dashboard'}>
          Futebasssss
        </LogoLink>
        
        <NavMenuRoot>
          <NavList>
            {navLinks.map((link) => (
              <NavItem key={link.to}>
                <NavLink 
                  asChild 
                  $active={location.pathname === link.to}
                >
                  <Link to={link.to}>{link.label}</Link>
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </NavMenuRoot>
        
        <UserSection>
          <ThemeToggle onClick={toggleTheme} title="Alternar tema">
            {isDarkMode ? '🌞' : '🌙'}
          </ThemeToggle>
          
          <UserName>{user?.name}</UserName>
          
          <DropdownMenu.Root>
            <UserMenuTrigger>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </UserMenuTrigger>
            
            <DropdownMenu.Portal>
              <UserMenuContent>
                <MenuItem>
                  Perfil
                </MenuItem>
                <MenuItem>
                  Configurações
                </MenuItem>
                <SeparatorItem />
                <LogoutMenuItem onClick={logout}>
                  Sair
                </LogoutMenuItem>
              </UserMenuContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </UserSection>
        
        {/* Menu móvel */}
        <MobileMenuContainer $isOpen={mobileMenuOpen}>
          <MobileNavList>
            {navLinks.map((link) => (
              <MobileNavItem key={link.to}>
                <MobileNavLink 
                  to={link.to}
                  $active={location.pathname === link.to}
                  onClick={handleMobileLinkClick}
                >
                  {link.label}
                </MobileNavLink>
              </MobileNavItem>
            ))}
          </MobileNavList>
          
          <MobileUserSection>
            <MobileUserInfo>
              <MobileAvatar>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </MobileAvatar>
              <MobileUserName>{user?.name || 'Usuário'}</MobileUserName>
            </MobileUserInfo>
            
            <MobileNavItem>
              <MobileNavLink to="/profile">
                Perfil
              </MobileNavLink>
            </MobileNavItem>
            
            <MobileNavItem>
              <MobileNavLink to="/settings">
                Configurações
              </MobileNavLink>
            </MobileNavItem>
            
            <MobileNavItem>
              <MobileNavLink 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  handleMobileLinkClick();
                }}
                style={{ color: '#e11d48' }}
              >
                Sair
              </MobileNavLink>
            </MobileNavItem>
          </MobileUserSection>
        </MobileMenuContainer>
      </NavInner>
    </NavContainer>
  );
};

export default MainNavigation; 