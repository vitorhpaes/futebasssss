import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.light};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error.main};
  border: 1px solid ${({ theme }) => theme.colors.error.main};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: white;
  }
`;

export const WelcomeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const WelcomeTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`; 