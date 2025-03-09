import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useCreateUserMutation } from '../../services/users/users.queries';
import { registerUserSchema, RegisterUserDto } from '../../services/users/users.interfaces';
import * as S from './PlayerCreatePage.styles';
import Select, { SelectOption } from '../../components/form/Select';
import { prepareFormSubmission } from '../../utils/payload-helper';

const PlayerCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createUserMutation = useCreateUserMutation();

  // Opções para os selects
  const typeOptions: SelectOption[] = [
    { value: 'PLAYER', label: 'Jogador' },
    { value: 'ADMIN', label: 'Administrador' }
  ];

  const positionOptions: SelectOption[] = [
    { value: '', label: 'Selecione uma posição' },
    { value: 'DEFENDER', label: 'Zagueiro' },
    { value: 'MIDFIELDER', label: 'Meio-campo' },
    { value: 'FORWARD', label: 'Atacante' }
  ];

  // Definir interface customizada para evitar problemas de tipo
  interface FormValues {
    email: string;
    name: string;
    password: string;
    type: 'PLAYER' | 'ADMIN';
    phone: string;
    position: string | null;
    observations: string | null;
  }

  // Usar o schema do serviço para validação
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      type: 'PLAYER',
      phone: '',
      position: null,
      observations: null
    },
    validationSchema: toFormikValidationSchema(registerUserSchema),
    onSubmit: async (values) => {
      try {
        // Usar a utility para limpar o payload
        const cleanPayload = prepareFormSubmission<RegisterUserDto>(values as RegisterUserDto, {
          emptyStringsToNull: true,
          removeNull: false, // Manter campos nulos para que o backend possa lidar com eles apropriadamente
          alwaysInclude: ['type'] // 'type' deve ser sempre incluído
        });
        
        await createUserMutation.mutateAsync(cleanPayload as RegisterUserDto);
        alert('Jogador cadastrado com sucesso!');
        navigate('/admin/players');
      } catch (error) {
        console.error('Erro ao cadastrar jogador:', error);
        alert('Ocorreu um erro ao cadastrar o jogador. Por favor, tente novamente.');
      }
    }
  });

  const handleCancel = () => {
    navigate('/admin/players');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastrar Novo Jogador</S.Title>
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
            <S.FormGroup name="password" serverInvalid={!!formik.errors.password && formik.touched.password}>
              <S.FormLabel>Senha (opcional)</S.FormLabel>
              <S.FormInput
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <S.FormHint>
                Deixe em branco para gerar uma senha automática.
              </S.FormHint>
              {formik.touched.password && formik.errors.password && (
                <S.FormMessage>{formik.errors.password}</S.FormMessage>
              )}
            </S.FormGroup>

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
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup name="type" serverInvalid={!!formik.errors.type && formik.touched.type}>
              <S.FormLabel>Tipo *</S.FormLabel>
              <div style={{ marginTop: 2 }}>
                <Select
                  name="type"
                  options={typeOptions}
                  value={formik.values.type}
                  onValueChange={(value) => {
                    formik.setFieldValue('type', value);
                  }}
                  required
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
            <S.SubmitButton type="submit" disabled={formik.isSubmitting || createUserMutation.isPending}>
              {formik.isSubmitting || createUserMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.StyledForm>
      </S.FormContainer>
    </S.Container>
  );
};

export default PlayerCreatePage; 