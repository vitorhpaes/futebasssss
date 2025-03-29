import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMatchFormStore } from '../../context/matchFormStore';
import { useCreateMatchMutation } from '../../services/matches/matches.queries';
import { createMatchSchema } from '../../services/matches/matches.interfaces';
import { combineDateAndTime } from '../../utils/date-utils';
import { useToast } from '../../components/ui/Toast';
import Alert from '../../components/ui/Alert';
import { FiCalendar, FiMapPin, FiClock, FiFileText, FiArrowLeft, FiSave } from 'react-icons/fi';
import * as S from './MatchCreatePage.styles';

// Tipo para os valores do formulário
interface FormValues {
  location: string;
  date: string;
  time: string;
  notes: string;
}

const MatchCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useMatchFormStore();
  const createMatchMutation = useCreateMatchMutation();
  const { showToast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);

  // Configurar formik com valores iniciais da store
  const formik = useFormik<FormValues>({
    initialValues: {
      location: formData.location,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    },
    validationSchema: toFormikValidationSchema(createMatchSchema.omit({ date: true }).extend({
      date: createMatchSchema.shape.date,
      time: createMatchSchema.shape.date,
    })),
    onSubmit: async (values) => {
      try {
        // Combinar data e hora em formato ISO com timezone de SP
        const dateTimeISO = combineDateAndTime(values.date, values.time);
        
        if (!dateTimeISO) {
          formik.setErrors({
            date: 'Data inválida',
            time: 'Hora inválida'
          });
          showToast('Verifique os campos de data e hora', 'error');
          return;
        }
        
        // Salvar na store global para reutilizar nos próximos formulários
        updateFormData(values);
        
        // Enviar dados para API
        await createMatchMutation.mutateAsync({
          date: dateTimeISO,
          location: values.location,
          notes: values.notes,
        });
        
        // Mostrar toast de sucesso
        showToast('Partida criada com sucesso!', {
          type: 'success',
          duration: 3000
        });
        
        // Redirecionar após 2 segundos se bem sucedido
        setTimeout(() => {
          navigate('/admin/matches');
        }, 2000);
      } catch (error) {
        console.error('Erro ao criar partida:', error);
        showToast('Ocorreu um erro ao criar a partida. Tente novamente.', {
          type: 'error',
          duration: 5000
        });
      }
    },
  });

  // Atualizar o store sempre que os valores do formulário mudarem
  useEffect(() => {
    if (formik.dirty) {
      updateFormData(formik.values);
    }
  }, [formik.values, updateFormData]);

  // Verificar se tem campos com erro
  const hasErrors = Object.keys(formik.errors).length > 0 && formik.touched.location;

  useEffect(() => {
    if (hasErrors) {
      setFormError('Há campos com erro no formulário. Por favor, verifique e tente novamente.');
    } else {
      setFormError(null);
    }
  }, [hasErrors]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Criar Nova Partida</S.Title>
        <S.Subtitle>
          Preencha os dados abaixo para agendar uma nova partida.
        </S.Subtitle>
      </S.Header>

      {formError && (
        <Alert 
          type="error" 
          message={formError} 
          onClose={() => setFormError(null)} 
        />
      )}

      <S.FormContainer onSubmit={formik.handleSubmit}>
        <S.FormSection>
          <S.FormRow>
            <S.FormColumn>
              <div>
                <S.FormLabel htmlFor="location">
                  <FiMapPin size={16} style={{ marginRight: '6px' }} />
                  Local *
                </S.FormLabel>
                <S.FormInput
                  id="location"
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ex: Campo Sintético Arena Sul"
                  required
                />
                {formik.touched.location && formik.errors.location && (
                  <S.FormHelperText>{formik.errors.location}</S.FormHelperText>
                )}
              </div>
            </S.FormColumn>
          </S.FormRow>

          <S.FormRow>
            <S.FormColumn>
              <div>
                <S.FormLabel htmlFor="date">
                  <FiCalendar size={16} style={{ marginRight: '6px' }} />
                  Data *
                </S.FormLabel>
                <S.FormInput
                  id="date"
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.date && formik.errors.date && (
                  <S.FormHelperText>{formik.errors.date}</S.FormHelperText>
                )}
              </div>
            </S.FormColumn>

            <S.FormColumn>
              <div>
                <S.FormLabel htmlFor="time">
                  <FiClock size={16} style={{ marginRight: '6px' }} />
                  Horário *
                </S.FormLabel>
                <S.FormInput
                  id="time"
                  type="time"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.time && formik.errors.time && (
                  <S.FormHelperText>{formik.errors.time}</S.FormHelperText>
                )}
              </div>
            </S.FormColumn>
          </S.FormRow>

          <S.FormRow>
            <S.FormColumn>
              <div>
                <S.FormLabel htmlFor="notes">
                  <FiFileText size={16} style={{ marginRight: '6px' }} />
                  Anotações Públicas
                </S.FormLabel>
                <S.FormTextarea
                  id="notes"
                  name="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Informações importantes para os jogadores (opcional)"
                />
                {formik.touched.notes && formik.errors.notes && (
                  <S.FormHelperText>{formik.errors.notes}</S.FormHelperText>
                )}
                <S.FormHelperText>
                  Estas anotações serão compartilhadas com todos os jogadores.
                </S.FormHelperText>
              </div>
            </S.FormColumn>
          </S.FormRow>
        </S.FormSection>

        <S.ButtonsContainer>
          <S.SecondaryButton
            type="button"
            onClick={() => navigate('/admin/matches')}
            disabled={createMatchMutation.isPending}
          >
            <FiArrowLeft size={16} style={{ marginRight: '8px' }} />
            Cancelar
          </S.SecondaryButton>
          <S.PrimaryButton
            type="submit"
            disabled={createMatchMutation.isPending || (formik.dirty && !formik.isValid)}
          >
            {createMatchMutation.isPending && <S.LoadingSpinner />}
            {createMatchMutation.isPending ? 'Criando...' : (
              <>
                <FiSave size={16} style={{ marginRight: '8px' }} />
                Criar Partida
              </>
            )}
          </S.PrimaryButton>
        </S.ButtonsContainer>
      </S.FormContainer>
    </S.Container>
  );
};

export default MatchCreatePage; 