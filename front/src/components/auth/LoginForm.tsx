import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import styled from 'styled-components';
import { UserRole } from '../../context/authStore';
import { useLogin } from '../../services/auth/auth.queries';
import { z } from 'zod';

// Schema customizado apenas para o formulário, sem o campo role que não é enviado ao backend
const formLoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

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

const FormError = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  background-color: ${({ theme }) => theme.colors.error.light}20;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

interface LoginFormProps {
  role: UserRole;
  redirectPath: string;
}

export default function LoginForm({ role, redirectPath }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const { login, isLoading, error } = useLogin();

  const validateForm = (): boolean => {
    try {
      formLoginSchema.parse({ email, password });
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await login(email, password, role, redirectPath);
  };

  const placeholderEmail = role === 'admin' ? 'admin@example.com' : 'player@example.com';

  return (
    <StyledForm onSubmit={handleSubmit}>
      {error && <FormError>{error.message}</FormError>}

      <FormField name="email">
        <FormLabel>Email</FormLabel>
        <Form.Control asChild>
          <FormInput
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderEmail}
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
              {validationErrors.email && (
                <ErrorMessage>{validationErrors.email}</ErrorMessage>
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
            onChange={(e) => setPassword(e.target.value)}
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
              {validationErrors.password && (
                <ErrorMessage>{validationErrors.password}</ErrorMessage>
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