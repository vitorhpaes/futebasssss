import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { registerUserSchema, RegisterUserDto } from '../../services/users/users.interfaces';
import * as S from './PlayerCreatePage.styles';
import Select from '../../components/form/Select';
import { prepareFormSubmission } from '../../utils/payload-helper';
import { useCreateUserMutation } from '../../services/users/users.queries';
import { z } from 'zod';
import { useToast } from '../../components/ui/Toast';
import { 
  UserType,
  USER_TYPE_OPTIONS,
  POSITION_OPTIONS,
  Option
} from '@futebasssss-ia/constants';

const PlayerCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createUserMutation = useCreateUserMutation();
  const { showToast } = useToast();

  // Opções para os selects usando as constantes compartilhadas
  const typeOptions = USER_TYPE_OPTIONS;
  
  // Adicionando opção vazia para posição
  const emptyPositionOption: Option<string> = { value: '', label: 'Selecione uma posição' };
  const positionOptions = [emptyPositionOption, ...POSITION_OPTIONS];

  // Definir interface customizada para evitar problemas de tipo
  interface FormValues {
    email: string;
    name: string;
    password: string;
    type: string; // Usando string para compatibilidade com o formulário
    phone: string;
    position: string | null; // Permitir null e string para compatibilidade
    observations: string | null;
  }
  
  // Usar o schema do serviço para validação
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      type: UserType.PLAYER, // Usando o enum diretamente
      phone: '',
      position: '', // Inicializando como string vazia
      observations: null
    },
    validationSchema: toFormikValidationSchema(registerUserSchema as z.ZodType<FormValues>),
    onSubmit: async (values) => {
      try {
        // Usar a utility para limpar o payload
        const cleanPayload = prepareFormSubmission<RegisterUserDto>(values as RegisterUserDto, {
          emptyStringsToNull: true,
          removeNull: false, // Manter campos nulos para que o backend possa lidar com eles apropriadamente
          alwaysInclude: ['type'] // 'type' deve ser sempre incluído
        });
        
        await createUserMutation.mutateAsync(cleanPayload as RegisterUserDto);
        showToast('Jogador cadastrado com sucesso!', 'success');
        navigate('/admin/players');
      } catch (error) {
        console.error('Erro ao cadastrar jogador:', error);
        showToast('Erro ao cadastrar jogador. Verifique os dados e tente novamente.', 'error');
      }
    },
  });

  const handleCancel = () => {
    navigate('/admin/players');
  };

  // Exibir tela de carregamento
  if (createUserMutation.isPending) {
    return <div>Carregando...</div>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastrar Jogador</S.Title>
      </S.Header>
      
      <S.FormContainer>
        <S.StyledForm onSubmit={formik.handleSubmit}>
          <S.FormRow>
            <S.FormGroup name="name" serverInvalid={!!formik.errors.name && formik.touched.name}>
              <S.FormLabel>Nome</S.FormLabel>
              <S.FormInput
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <S.FormMessage>{formik.errors.name}</S.FormMessage>
              )}
            </S.FormGroup>
          
            <S.FormGroup name="email" serverInvalid={!!formik.errors.email && formik.touched.email}>
              <S.FormLabel>Email</S.FormLabel>
              <S.FormInput
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <S.FormMessage>{formik.errors.email}</S.FormMessage>
              )}
            </S.FormGroup>
          </S.FormRow>
          
          <S.FormRow>
            <S.FormGroup name="password" serverInvalid={!!formik.errors.password && formik.touched.password}>
              <S.FormLabel>Senha</S.FormLabel>
              <S.FormInput
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <S.FormMessage>{formik.errors.password}</S.FormMessage>
              )}
            </S.FormGroup>
          
            <S.FormGroup name="phone" serverInvalid={!!formik.errors.phone && formik.touched.phone}>
              <S.FormLabel>Telefone</S.FormLabel>
              <S.FormInput
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <S.FormMessage>{formik.errors.phone}</S.FormMessage>
              )}
            </S.FormGroup>
          </S.FormRow>
          
          <S.FormRow>
            <S.FormGroup name="type" serverInvalid={!!formik.errors.type && formik.touched.type}>
              <S.FormLabel>Tipo</S.FormLabel>
              <div style={{ marginTop: 2 }}>
                <Select
                  name="type"
                  options={typeOptions}
                  onValueChange={(value) => formik.setFieldValue('type', value)}
                  value={formik.values.type}
                />
              </div>
              {formik.touched.type && formik.errors.type && (
                <S.FormMessage>{formik.errors.type}</S.FormMessage>
              )}
            </S.FormGroup>
          
            <S.FormGroup name="position" serverInvalid={!!formik.errors.position && formik.touched.position}>
              <S.FormLabel>Posição</S.FormLabel>
              <div style={{ marginTop: 2 }}>
                <Select
                  name="position"
                  options={positionOptions}
                  onValueChange={(value) => formik.setFieldValue('position', value)}
                  value={formik.values.position || ''}
                />
              </div>
              {formik.touched.position && formik.errors.position && (
                <S.FormMessage>{formik.errors.position}</S.FormMessage>
              )}
            </S.FormGroup>
          </S.FormRow>
          
          <S.FormGroup name="observations" serverInvalid={!!formik.errors.observations && formik.touched.observations}>
            <S.FormLabel>Observações</S.FormLabel>
            <S.FormTextArea
              id="observations"
              name="observations"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.observations || ''}
            />
            {formik.touched.observations && formik.errors.observations && (
              <S.FormMessage>{formik.errors.observations}</S.FormMessage>
            )}
          </S.FormGroup>
          
          <S.ButtonGroup>
            <S.CancelButton type="button" onClick={handleCancel}>
              Cancelar
            </S.CancelButton>
            <S.SubmitButton type="submit" disabled={formik.isSubmitting || createUserMutation.isPending}>
              {createUserMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.StyledForm>
      </S.FormContainer>
    </S.Container>
  );
};

export default PlayerCreatePage; 