import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};
  
  /* Ajustes responsivos para o conteúdo principal */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.light};
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[3]};
    font-size: 0.8rem;
  }
`; 