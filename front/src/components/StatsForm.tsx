import { styled } from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import * as Form from '@radix-ui/react-form';
import { useUpdatePlayerStats } from '../services/player-sessions/player-sessions.queries';
import { useToast } from '../components/ui/Toast';

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 8px 0 0;
  font-size: 14px;
`;

const StyledForm = styled(Form.Root)`
  width: 100%;
`;

const FormGroup = styled(Form.Field)<{ serverInvalid?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FormLabel = styled(Form.Label)`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormInput = styled.input`
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

const FormMessage = styled(Form.Message)`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubmitButton = styled(Button)`
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

interface StatsFormProps {
  playerSessionId: number;
}

const statsSchema = z.object({
  goals: z.number().min(0, 'Campo obrigatório'),
  assists: z.number().min(0, 'Campo obrigatório'),
});

type StatsFormValues = z.infer<typeof statsSchema>;

export const StatsForm = ({ playerSessionId }: StatsFormProps) => {
  const { mutate: updateStats, isPending } = useUpdatePlayerStats();
  const { showToast } = useToast();

  const formik = useFormik<StatsFormValues>({
    initialValues: {
      goals: 0,
      assists: 0,
    },
    validationSchema: toFormikValidationSchema(statsSchema),
    onSubmit: (values) => {
      updateStats(
        {
          id: playerSessionId,
          goals: Number(values.goals) || 0,
          assists: Number(values.assists) || 0,
        },
        {
          onSuccess: () => {
            showToast('Stats enviados com sucesso!', {
              type: 'success',
              duration: 3000
            });
          },
          onError: () => {
            showToast('Erro ao enviar os stats. Tente novamente.', {
              type: 'error',
              duration: 5000
            });
          }
        }
      );
    },
  });

  return (
    <Container>
      <FormContainer>
        <Header>
          <Title>Trouxe o futebol?</Title>
          <Subtitle>Quais os seus números na partida?</Subtitle>
        </Header>
        
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormGroup name="goals" serverInvalid={!!formik.errors.goals && formik.touched.goals}>
              <FormLabel>Gols</FormLabel>
              <FormInput
                type="number"
                placeholder="0"
                {...formik.getFieldProps('goals')}
              />
              {formik.touched.goals && formik.errors.goals && (
                <FormMessage>{formik.errors.goals}</FormMessage>
              )}
            </FormGroup>
            
            <FormGroup name="assists" serverInvalid={!!formik.errors.assists && formik.touched.assists}>
              <FormLabel>Assistências</FormLabel>
              <FormInput
                type="number"
                placeholder="0"
                {...formik.getFieldProps('assists')}
              />
              {formik.touched.assists && formik.errors.assists && (
                <FormMessage>{formik.errors.assists}</FormMessage>
              )}
            </FormGroup>
          </FormRow>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={formik.isSubmitting || isPending}>
              {isPending ? 'Enviando...' : 'Enviar estatísticas'}
              <FiSend size={16} />
            </SubmitButton>
          </ButtonGroup>
        </StyledForm>
      </FormContainer>
    </Container>
  );
}; 