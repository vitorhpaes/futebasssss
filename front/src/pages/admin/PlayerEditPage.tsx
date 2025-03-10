import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { updateUserSchema, UpdateUserDto } from '../../services/users/users.interfaces';
import * as S from './PlayerCreatePage.styles';
import Select, { SelectOption } from '../../components/form/Select';
import { prepareFormSubmission } from '../../utils/payload-helper';
import { useUpdateUserMutation, useUser } from '../../services/users/users.queries';
import { z } from 'zod';

const PlayerEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : 0;

  // Buscar dados do usuário
  const { data: user, isLoading: isLoadingUser, error: userError } = useUser(userId);
  const updateUserMutation = useUpdateUserMutation();

  // Opções para os selects
  const typeOptions: SelectOption[] = [
    { value: 'PLAYER', label: 'Jogador' },
    { value: 'ADMIN', label: 'Administrador' }
  ];

  const positionOptions: SelectOption[] = [
    { value: '', label: 'Selecione uma posição' },
    { value: 'GOALKEEPER', label: 'Goleiro' },
    { value: 'DEFENDER', label: 'Zagueiro' },
    { value: 'MIDFIELDER', label: 'Meio-campo' },
    { value: 'FORWARD', label: 'Atacante' }
  ];

  // Definir interface customizada para evitar problemas de tipo
  interface FormValues {
    email?: string;
    name?: string;
    type: 'PLAYER' | 'ADMIN'; // Mantido para o formulário, mas não faz parte do schema de atualização
    phone?: string | null;
    position?: string | null;
    observations?: string | null;
  }

  // Usar o schema do serviço para validação
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      name: '',
      type: 'PLAYER',
      phone: null,
      position: null,
      observations: null
    },
    validationSchema: toFormikValidationSchema(updateUserSchema as unknown as z.ZodType<Omit<FormValues, 'type'>>),
    onSubmit: async (values) => {
      try {
        // Criar um objeto com apenas os campos permitidos no schema de atualização
        const updateData = {
          email: values.email,
          name: values.name,
          phone: values.phone,
          position: values.position,
          observations: values.observations
        };
        
        // Usar a utility para limpar o payload
        const cleanPayload = prepareFormSubmission<UpdateUserDto>(updateData as UpdateUserDto, {
          emptyStringsToNull: true,
          removeNull: false, // Manter campos nulos para que o backend possa lidar com eles apropriadamente
        });
        
        await updateUserMutation.mutateAsync({ 
          id: userId, 
          data: cleanPayload as UpdateUserDto 
        });
        alert('Jogador atualizado com sucesso!');
        navigate('/admin/players');
      } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        alert('Ocorreu um erro ao atualizar o jogador. Por favor, tente novamente.');
      }
    },
    enableReinitialize: true
  });

  // Atualizar o formulário quando os dados do usuário forem carregados
  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email || '',
        name: user.name || '',
        type: user.type || 'PLAYER',
        phone: user.phone || null,
        position: user.position || null,
        observations: user.observations || null
      });
    }
  }, [user]);

  const handleCancel = () => {
    navigate('/admin/players');
  };

  if (isLoadingUser) {
    return <div>Carregando dados do jogador...</div>;
  }

  if (userError) {
    return <div>Erro ao carregar dados do jogador. Por favor, tente novamente.</div>;
  }

  if (!user) {
    return <div>Jogador não encontrado.</div>;
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
              <S.FormLabel>Nome *</S.FormLabel>
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
              <S.FormLabel>Email *</S.FormLabel>
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
            <S.FormGroup name="phone" serverInvalid={!!formik.errors.phone && formik.touched.phone}>
              <S.FormLabel>Telefone</S.FormLabel>
              <S.FormInput
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone || ''}
              />
              {formik.touched.phone && formik.errors.phone && (
                <S.FormMessage>{formik.errors.phone}</S.FormMessage>
              )}
            </S.FormGroup>

            <S.FormGroup name="type" serverInvalid={false}>
              <S.FormLabel>Tipo</S.FormLabel>
              <div style={{ marginTop: 2 }}>
                <Select
                  name="type"
                  options={typeOptions}
                  value={formik.values.type}
                  onValueChange={(value) => {
                    formik.setFieldValue('type', value);
                  }}
                  disabled
                />
              </div>
              <S.FormHint>
                O tipo de usuário não pode ser alterado.
              </S.FormHint>
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup name="position" serverInvalid={!!formik.errors.position && formik.touched.position}>
              <S.FormLabel>Posição</S.FormLabel>
              <div style={{ marginTop: 2 }}>
                <Select
                  name="position"
                  options={positionOptions}
                  value={formik.values.position || ''}
                  onValueChange={(value) => {
                    formik.setFieldValue('position', value || null);
                  }}
                  placeholder="Selecione uma posição"
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
              value={formik.values.observations === null ? '' : formik.values.observations}
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
              {formik.isSubmitting || updateUserMutation.isPending ? 'Salvando...' : 'Salvar'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.StyledForm>
      </S.FormContainer>
    </S.Container>
  );
};

export default PlayerEditPage; 