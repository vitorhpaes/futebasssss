import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import styled from 'styled-components';
import { useAuthStore, UserRole } from '../../context/authStore';

const StyledForm = styled(Form.Root)`
  width: 100%;
  max-width: 400px;
`;

const FormField = styled(Form.Field)`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FormLabel = styled(Form.Label)`
  display: block;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.neutral.main};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}33;
  }
`;

const ErrorMessage = styled(Form.Message)`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 500;
  transition: background-color 0.2s;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing[2]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral.main};
    cursor: not-allowed;
  }
`;

const RoleSelector = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.neutral.main};
`;

const RoleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme, $isActive }) => $isActive 
    ? theme.colors.primary.main 
    : theme.colors.background.paper};
  color: ${({ theme, $isActive }) => $isActive 
    ? 'white' 
    : theme.colors.text.primary};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, $isActive }) => $isActive 
      ? theme.colors.primary.dark 
      : theme.colors.neutral.light};
  }
`;

const FormError = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  background-color: ${({ theme }) => theme.colors.error.light}20;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('player');
  
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password, role);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {error && <FormError>{error}</FormError>}

      <RoleSelector>
        <RoleButton 
          type="button"
          $isActive={role === 'player'} 
          onClick={() => { setRole('player'); clearError(); }}
        >
          Jogador
        </RoleButton>
        <RoleButton 
          type="button"
          $isActive={role === 'admin'} 
          onClick={() => { setRole('admin'); clearError(); }}
        >
          Administrador
        </RoleButton>
      </RoleSelector>

      <FormField name="email">
        <FormLabel>Email</FormLabel>
        <Form.Control asChild>
          <FormInput
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError(); }}
            placeholder={role === 'admin' ? 'admin@example.com' : 'player@example.com'}
          />
        </Form.Control>
        <Form.ValidityState>
          {(validity) => (
            <>
              {validity?.valueMissing && (
                <ErrorMessage>Email é obrigatório</ErrorMessage>
              )}
              {validity?.typeMismatch && (
                <ErrorMessage>Por favor, insira um email válido</ErrorMessage>
              )}
            </>
          )}
        </Form.ValidityState>
      </FormField>

      <FormField name="password">
        <FormLabel>Senha</FormLabel>
        <Form.Control asChild>
          <FormInput
            type="password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearError(); }}
            placeholder="Digite sua senha"
            minLength={6}
          />
        </Form.Control>
        <Form.ValidityState>
          {(validity) => (
            <>
              {validity?.valueMissing && (
                <ErrorMessage>Senha é obrigatória</ErrorMessage>
              )}
              {validity?.tooShort && (
                <ErrorMessage>Senha deve ter no mínimo 6 caracteres</ErrorMessage>
              )}
            </>
          )}
        </Form.ValidityState>
      </FormField>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </SubmitButton>
    </StyledForm>
  );
} 