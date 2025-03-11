import styled from 'styled-components';
import * as Form from '@radix-ui/react-form';
import * as Dialog from '@radix-ui/react-dialog';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const FilterWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

export const FilterContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: 24px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 500px;
  max-width: calc(100vw - 40px);
  z-index: 10;
  
  @media (max-width: 768px) {
    left: 0;
    right: auto;
    width: 100%;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.background.paper};
    transform: rotate(45deg);
    
    @media (max-width: 768px) {
      right: auto;
      left: 20px;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 5;
`;

export const StyledForm = styled(Form.Root)`
  width: 100%;
`;

export const FilterFormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled(Form.Field)`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled(Form.Label)`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light}40;
  }
`;

export const FormSelect = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light}40;
  }
`;

export const FilterActions = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 16px;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  &:focus {
    outline: none;
  }
`;

export const PrimaryButton = styled(FilterButton)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const SecondaryButton = styled(FilterButton)`
  background-color: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PlayerName = styled.h2`
  font-size: 18px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

interface BadgeProps {
  $type: 'PLAYER' | 'ADMIN';
}

export const Badge = styled.span<BadgeProps>`
  background-color: ${({ theme, $type }) => 
    $type === 'ADMIN' ? theme.colors.error.main : theme.colors.primary.main};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const FieldValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

export const EditButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const DeleteButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.error.main};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.background.default};
  border-top: 3px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Dialog de confirmação
export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const DialogCloseButton = styled(Dialog.Close)`
  background-color: ${({ theme }) => theme.colors.neutral.light};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.main};
  }
`;

export const DialogConfirmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error.main};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error.dark};
  }
`; 