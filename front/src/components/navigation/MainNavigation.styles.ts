import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const NavContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavInner = styled.div`
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

export const LogoLink = styled(Link)`
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

export const NavMenuRoot = styled(NavigationMenu.Root)`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  flex: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavList = styled(NavigationMenu.List)`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const NavItem = styled(NavigationMenu.Item)`
  margin-right: ${({ theme }) => theme.spacing[4]};
`;

interface NavLinkProps {
  $active?: boolean;
}

export const NavLink = styled(NavigationMenu.Link)<NavLinkProps>`
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

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-left: auto;
  }
`;

export const UserName = styled.span`
  margin-right: ${({ theme }) => theme.spacing[3]};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ThemeToggle = styled.button`
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

export const UserMenuTrigger = styled(DropdownMenu.Trigger)`
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

export const UserMenuContent = styled(DropdownMenu.Content)`
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing[2]};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 100;
`;

export const MenuItem = styled(DropdownMenu.Item)`
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

export const LogoutMenuItem = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.error.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.main}10;
    color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const SeparatorItem = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutral.light};
  margin: ${({ theme }) => theme.spacing[1]} 0;
`;

// Componentes para menu móvel
export const MobileMenuButton = styled.button`
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

export const MobileMenuContainer = styled.div<MobileMenuContainerProps>`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.background.paper};
    z-index: 99;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow-y: auto;
    box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const MobileNavList = styled.ul`
  list-style: none;
  padding: ${({ theme }) => theme.spacing[4]};
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

export const MobileNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

interface MobileNavLinkProps {
  $active?: boolean;
}

export const MobileNavLink = styled(Link)<MobileNavLinkProps>`
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

export const MobileUserSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.light};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

export const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light}33;
`;

export const MobileAvatar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing[3]};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const MobileUserName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const MobileUserRole = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: block;
  margin-top: 2px;
`;

export const MobileUserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const MobileActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[2]}`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  gap: 8px;
  
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.background.default};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const MobileLogoutButton = styled(MobileActionButton)`
  grid-column: span 2;
  margin-top: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.error.main}15;
  color: ${({ theme }) => theme.colors.error.main};
  border-color: ${({ theme }) => theme.colors.error.main}30;
  
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.error.main}25;
    border-color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const MobileThemeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

interface ThemeToggleSwitchProps {
  $active?: boolean;
}

export const ThemeToggleSwitch = styled.button<ThemeToggleSwitchProps>`
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.main : theme.colors.neutral.light};
  width: 48px;
  height: 24px;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    left: ${({ $active }) => $active ? 'calc(100% - 22px)' : '2px'};
    transition: left 0.3s ease;
  }
`; 