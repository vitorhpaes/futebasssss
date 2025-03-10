import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';
import { useTheme } from '../../theme/ThemeProvider';
import { useState, useEffect, useRef } from 'react';

import {
  NavContainer,
  NavInner,
  LogoLink,
  NavMenuRoot,
  NavList,
  NavItem,
  NavLink,
  UserSection,
  UserName,
  ThemeToggle,
  UserMenuTrigger,
  UserMenuContent,
  MenuItem,
  LogoutMenuItem,
  SeparatorItem,
  MobileMenuButton,
  MobileMenuContainer,
  MobileNavList,
  MobileNavItem,
  MobileNavLink,
  MobileUserSection,
  MobileUserInfo,
  MobileAvatar,
  MobileUserDetails,
  MobileUserName,
  MobileUserRole,
  MobileThemeToggle,
  ThemeToggleSwitch,
  MobileActionButtons,
  MobileActionButton,
  MobileLogoutButton
} from './MainNavigation.styles';

const MainNavigation = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  // Prevenir rolagem do body quando o menu móvel estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  // Fechar menu ao clicar fora dele (excluindo o botão de menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Não fecha o menu se clicar no botão de menu, pois ele tem seu próprio handler
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node)) {
        return;
      }
      
      // Fecha o menu se clicar fora dele
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);
  
  // Toggle do menu - função explícita para garantir o comportamento correto
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState);
  };
  
  const isAdmin = user?.role === 'admin';
  
  // Links de navegação baseados no tipo de usuário
  const navLinks = isAdmin
    ? [
        { to: '/admin/dashboard', label: 'Dashboard' },
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
          onClick={toggleMobileMenu}
          aria-label="Menu de navegação"
          ref={menuButtonRef}
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
        <MobileMenuContainer 
          $isOpen={mobileMenuOpen}
          ref={menuRef}
        >
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
              <MobileUserDetails>
                <MobileUserName>{user?.name || 'Usuário'}</MobileUserName>
                <MobileUserRole>{isAdmin ? 'Administrador' : 'Jogador'}</MobileUserRole>
              </MobileUserDetails>
            </MobileUserInfo>
            
            <MobileThemeToggle>
              <span>Modo escuro</span>
              <ThemeToggleSwitch 
                onClick={toggleTheme} 
                title="Alternar tema"
                $active={isDarkMode}
                aria-label="Alternar tema escuro"
              >
                <span className="visually-hidden">
                  {isDarkMode ? 'Desativar modo escuro' : 'Ativar modo escuro'}
                </span>
              </ThemeToggleSwitch>
            </MobileThemeToggle>
            
            <MobileActionButtons>
              <MobileActionButton onClick={() => {
                handleMobileLinkClick();
                // Navegação para perfil aqui
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Perfil
              </MobileActionButton>
              
              <MobileActionButton onClick={() => {
                handleMobileLinkClick();
                // Navegação para configurações aqui
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Config.
              </MobileActionButton>
              
              <MobileLogoutButton 
                onClick={() => {
                  logout();
                  handleMobileLinkClick();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sair
              </MobileLogoutButton>
            </MobileActionButtons>
          </MobileUserSection>
        </MobileMenuContainer>
      </NavInner>
    </NavContainer>
  );
};

export default MainNavigation; 