import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMatches, useDeleteMatchMutation } from '../../services/matches/matches.queries';
import { FiPlus, FiFilter, FiX, FiCalendar, FiMapPin, FiTag } from 'react-icons/fi';
import Alert from '../../components/ui/Alert';
import { useToast } from '../../components/ui/Toast';
import * as S from './MatchListPage.styles';
import MatchCard from '../../components/cards/MatchCard';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Select from '../../components/form/Select';
import { SessionStatus, SESSION_STATUS_OPTIONS } from '@futebasssss-ia/constants';

// Estilos para o botão de filtro
const FilterTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

// Interface para os filtros
interface MatchFilterParams {
  location?: string;
  status?: SessionStatus;
  date?: string;
}

// Componente para a página de listagem de partidas
const MatchListPage = () => {
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  
  // Estado para controlar a visibilidade dos filtros
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Opções para o select de status
  const allStatusOption = { value: '', label: 'Todos' };
  const statusOptions = [allStatusOption, ...SESSION_STATUS_OPTIONS];
  
  // Formik para gerenciar o formulário de filtro
  const formik = useFormik<MatchFilterParams>({
    initialValues: {
      location: '',
      status: undefined,
      date: ''
    },
    onSubmit: (values) => {
      // Remover valores vazios para não enviá-los como parâmetros
      const filters: MatchFilterParams = {};
      if (values.location) filters.location = values.location;
      if (values.status) filters.status = values.status;
      if (values.date) filters.date = values.date;
      
      // Fechar o filtro após submeter
      setIsFilterOpen(false);
    }
  });
  
  // Função para fechar o filtro quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);
  
  // Mutation para excluir partidas
  const deleteMatchMutation = useDeleteMatchMutation();
  
  // Usar o hook de query para buscar partidas
  const { data: matches, isLoading, error } = useMatches(formik.values);

  // Função para limpar filtros
  const handleClearFilters = () => {
    formik.resetForm();
  };

  // Função para manipular a edição de uma partida
  const handleEditMatch = (id: number) => {
    navigate(`/admin/matches/manage/${id}`);
  };

  // Função para iniciar o processo de exclusão
  const handleDeleteMatch = (id: number) => {
    showToast(`Deseja realmente excluir esta partida?`, {
      type: 'info',
      duration: 10000, // 10 segundos para responder
      actions: [
        {
          label: 'Cancelar',
          variant: 'secondary',
          onClick: () => {
            // Não faz nada, apenas fecha o toast
          }
        },
        {
          label: 'Confirmar exclusão',
          variant: 'danger',
          onClick: () => {
            deleteMatchMutation.mutate(id, {
              onSuccess: () => {
                showToast('Partida excluída com sucesso!', { type: 'success' });
              },
              onError: (error) => {
                showToast(`Erro ao excluir partida: ${error.message}`, { type: 'error' });
              }
            });
          }
        }
      ]
    });
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Partidas</S.Title>
        <div style={{ display: 'flex', gap: '12px' }}>
          <S.FilterWrapper ref={filterRef}>
            <FilterTrigger onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FiFilter size={16} />
              {isFilterOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </FilterTrigger>
            
            {isFilterOpen && (
              <>
                <S.Overlay onClick={() => setIsFilterOpen(false)} />
                <S.FilterContainer>
                  <S.FilterHeader>
                    <S.FilterTitle>Filtrar Partidas</S.FilterTitle>
                    <S.SecondaryButton onClick={() => setIsFilterOpen(false)}>
                      <FiX size={14} />
                      Fechar
                    </S.SecondaryButton>
                  </S.FilterHeader>
                  
                  <S.StyledForm onSubmit={formik.handleSubmit}>
                    <S.FilterFormLayout>
                      <S.FormField name="location">
                        <S.FormLabel>
                          <FiMapPin size={14} />
                          Local
                        </S.FormLabel>
                        <S.FormInput
                          id="location"
                          name="location"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.location || ''}
                          placeholder="Filtrar por local"
                        />
                      </S.FormField>
                      
                      <S.FormField name="status">
                        <S.FormLabel>
                          <FiTag size={14} />
                          Status
                        </S.FormLabel>
                        <div style={{ marginTop: 2 }}>
                          <Select
                            name="status"
                            options={statusOptions}
                            value={formik.values.status || ''}
                            onValueChange={(value) => formik.setFieldValue('status', value)}
                            placeholder="Todos"
                          />
                        </div>
                      </S.FormField>
                      
                      <S.FormField name="date">
                        <S.FormLabel>
                          <FiCalendar size={14} />
                          Data
                        </S.FormLabel>
                        <S.FormInput
                          id="date"
                          name="date"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.date || ''}
                        />
                      </S.FormField>
                    </S.FilterFormLayout>
                    
                    <S.FilterActions>
                      <S.SecondaryButton type="button" onClick={handleClearFilters}>
                        <FiX size={14} />
                        Limpar Filtros
                      </S.SecondaryButton>
                      <S.PrimaryButton type="submit">
                        <FiFilter size={14} />
                        Aplicar Filtros
                      </S.PrimaryButton>
                    </S.FilterActions>
                  </S.StyledForm>
                </S.FilterContainer>
              </>
            )}
          </S.FilterWrapper>
          
          <Link to="/admin/matches/create">
            <S.Button>
              <FiPlus size={16} style={{ marginRight: '8px' }} />
              Criar Nova Partida
            </S.Button>
          </Link>
        </div>
      </S.Header>

      {isLoading ? (
        <S.LoadingContainer>
          <S.Spinner />
        </S.LoadingContainer>
      ) : error ? (
        <Alert
          type="error"
          message="Erro ao carregar partidas. Por favor, tente novamente mais tarde."
        />
      ) : matches && matches.length === 0 ? (
        <Alert
          type="info"
          title="Nenhuma partida encontrada"
          message="Clique em 'Criar Nova Partida' para adicionar a primeira."
        />
      ) : (
        <S.CardGrid>
          {matches && matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onEdit={handleEditMatch}
              onDelete={handleDeleteMatch}
            />
          ))}
        </S.CardGrid>
      )}
    </S.Container>
  );
};

export default MatchListPage; 