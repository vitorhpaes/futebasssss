import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { updateUserSchema, UpdateUserDto } from '../../services/users/users.interfaces';
import * as S from './PlayerCreatePage.styles';
import Select from '../../components/form/Select';
import { prepareFormSubmission } from '../../utils/payload-helper';
import { useUpdateUserMutation, useUser } from '../../services/users/users.queries';
import { z } from 'zod';
import { 
  UserType,
  USER_TYPE_OPTIONS,
  POSITION_OPTIONS,
  Option
} from '@futebass-ia/constants';

const PlayerEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : 0;

  // Buscar dados do usuário
  const { data: user, isLoading: isLoadingUser, error: userError } = useUser(userId);
  const updateUserMutation = useUpdateUserMutation();

  // Opções para os selects usando as constantes compartilhadas
  const typeOptions = USER_TYPE_OPTIONS;
  
  // Adicionando opção vazia para posição
  const emptyPositionOption: Option<string> = { value: '', label: 'Selecione uma posição' };
  const positionOptions = [emptyPositionOption, ...POSITION_OPTIONS];

  // Definir interface customizada para evitar problemas de tipo
  interface FormValues {
    email?: string;
    name?: string;
    type: string; // Usando string para compatibilidade com o formulário
    phone?: string | null;
    position?: string | null;
    observations?: string | null;
  }
  
  const formik = useFormik<FormValues>({
    initialValues: {
      email: user?.email || '',
      name: user?.name || '',
      type: user?.type || UserType.PLAYER,
      phone: user?.phone || '',
      position: user?.position || '', // Garantindo que não seja null
      observations: user?.observations || '',
    },
    enableReinitialize: true, // Importante para atualizar o formulário quando os dados do usuário forem carregados
    validationSchema: toFormikValidationSchema(updateUserSchema as unknown as z.ZodType<FormValues>), // Convertendo para unknown primeiro para evitar erro de tipo
    onSubmit: async (values) => {
      try {
        // Limpar o payload antes de enviar
        const cleanPayload = prepareFormSubmission<UpdateUserDto>(values as UpdateUserDto, {
          emptyStringsToNull: true,
          removeNull: false,
          alwaysInclude: ['type'] // Garantir que o tipo seja sempre incluído
        });
        
        await updateUserMutation.mutateAsync({
          id: userId,
          data: cleanPayload as UpdateUserDto
        });
        
        alert('Jogador atualizado com sucesso!');
        navigate('/admin/players');
      } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        alert('Erro ao atualizar jogador. Verifique os dados e tente novamente.');
      }
    },
  });

  // Log para debug
  useEffect(() => {
    if (user) {
      console.log('Dados do usuário carregados:', user);
      console.log('Valor da posição:', user.position);
    }
  }, [user]);

  const handleCancel = () => {
    navigate('/admin/players');
  };

  if (isLoadingUser) {
    return <div>Carregando dados do jogador...</div>;
  }

  if (userError) {
    // Conversão segura do erro
    const errorMessage = typeof userError === 'object' && userError !== null && 'message' in userError
      ? String(userError.message)
      : 'Erro desconhecido';
    
    return <div>Erro ao carregar dados do jogador: {errorMessage}</div>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Editar Jogador</S.Title>
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
                value={formik.values.name || ''}
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
                value={formik.values.email || ''}
              />
              {formik.touched.email && formik.errors.email && (
                <S.FormMessage>{formik.errors.email}</S.FormMessage>
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
                  value={formik.values.type || ''}
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
          
          <S.FormRow>
            <S.FormGroup name="phone" serverInvalid={!!formik.errors.phone && formik.touched.phone}>
              <S.FormLabel>Telefone</S.FormLabel>
              <S.FormInput
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone || ''}
              />
              {formik.touched.phone && formik.errors.phone && (
                <S.FormMessage>{formik.errors.phone}</S.FormMessage>
              )}
            </S.FormGroup>
          
            <div style={{ width: '100%' }}></div> {/* Espaçador */}
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
            <S.SubmitButton type="submit" disabled={formik.isSubmitting || updateUserMutation.isPending}>
              {updateUserMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.StyledForm>
      </S.FormContainer>
    </S.Container>
  );
};

export default PlayerEditPage; 