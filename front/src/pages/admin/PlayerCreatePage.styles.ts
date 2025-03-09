import styled from 'styled-components';
import * as Form from '@radix-ui/react-form';

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
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

export const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const StyledForm = styled(Form.Root)`
  width: 100%;
`;

export const FormGroup = styled(Form.Field)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const FormLabel = styled(Form.Label)`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FormHint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

export const FormMessage = styled(Form.Message)`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: 12px;
  margin-top: 4px;
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
`;

export const FormSelect = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 4px;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
`;

export const FormTextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

export const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.neutral.light};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.main};
  }
`;

export const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral.main};
    cursor: not-allowed;
  }
`; 