import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary.dark}20;
  background-image: linear-gradient(to bottom right, ${({ theme }) => theme.colors.secondary.dark}30, ${({ theme }) => theme.colors.primary.dark}30);
`;

export const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: 450px;
  margin: ${({ theme }) => theme.spacing[4]};
  border-top: 5px solid ${({ theme }) => theme.colors.secondary.main};
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const AppTitle = styled.h1`
  color: ${({ theme }) => theme.colors.secondary.main};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const AppDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

export const AdminBadge = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FooterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.secondary.main};
  font-size: 0.9rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`; 