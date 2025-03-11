import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUsers } from '../../services/users/users.queries';
import { UserFilterParams } from '../../services/users/users.interfaces';
import * as S from './PlayerListPage.styles';
import Select from '../../components/form/Select';
import {
  USER_TYPE_OPTIONS,
  POSITION_OPTIONS,
  Option
} from '@futebass-ia/constants';
import PlayerCard from '../../components/cards/PlayerCard';
import { FiFilter, FiX } from 'react-icons/fi';
import * as Collapsible from '@radix-ui/react-collapsible';
import styled from 'styled-components';

// Estilos adicionais para componentes Radix
const CollapsibleTrigger = styled(Collapsible.Trigger)`
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

const PlayerListPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para controlar a visibilidade dos filtros
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  
  // Opções para os selects usando as constantes compartilhadas
  
  // Adicionando opção 'Todas' para posição
  const allPositionsOption: Option<string> = { value: '', label: 'Todas' };
  const positionOptions = [allPositionsOption, ...POSITION_OPTIONS];

  // Adicionando opção 'Todos' para tipo
  const allTypesOption: Option<string> = { value: '', label: 'Todos' };
  const typeOptions = [allTypesOption, ...USER_TYPE_OPTIONS];
  
  // Formik para gerenciar o formulário de filtro
  const formik = useFormik<UserFilterParams>({
    initialValues: {
      name: '',
      position: '',
      type: ''
    },
    onSubmit: (values) => {
      // Remover valores vazios para não enviá-los como parâmetros
      const filters: UserFilterParams = {};
      if (values.name) filters.name = values.name;
      if (values.position) filters.position = values.position;
      if (values.type) filters.type = values.type;
      
      // Fechar o filtro após submeter
      setIsFilterOpen(false);
    }
  });
  
  // Obter lista de usuários com React Query
  const { data: players, isLoading, error } = useUsers(formik.values);
  
  const handleClearFilters = () => {
    formik.resetForm();
    setIsFilterOpen(false);
  };

  const handleCreatePlayer = () => {
    navigate('/admin/players/create');
  };

  const handleEditPlayer = (id: number) => {
    navigate(`/admin/players/edit/${id}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Jogadores</S.Title>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Collapsible.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger>
              <FiFilter size={16} />
              {isFilterOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </CollapsibleTrigger>
            
            <Collapsible.Content>
              <S.FilterContainer>
                <S.StyledForm onSubmit={formik.handleSubmit}>
                  <S.FilterFormLayout>
                    <S.FormField name="name">
                      <S.FormLabel>Nome</S.FormLabel>
                      <S.FormInput
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Buscar por nome"
                      />
                    </S.FormField>

                    <S.FormField name="position">
                      <S.FormLabel>Posição</S.FormLabel>
                      <div style={{ marginTop: 2 }}>
                        <Select
                          name="position"
                          options={positionOptions}
                          value={formik.values.position || ''}
                          onValueChange={(value) => formik.setFieldValue('position', value)}
                          placeholder="Todas"
                        />
                      </div>
                    </S.FormField>

                    <S.FormField name="type">
                      <S.FormLabel>Tipo</S.FormLabel>
                      <div style={{ marginTop: 2 }}>
                        <Select
                          name="type"
                          options={typeOptions}
                          value={formik.values.type || ''}
                          onValueChange={(value) => formik.setFieldValue('type', value)}
                          placeholder="Todos"
                        />
                      </div>
                    </S.FormField>

                    <S.FilterActions>
                      <S.Button type="submit">Filtrar</S.Button>
                      <S.SecondaryButton type="button" onClick={handleClearFilters}>
                        <FiX size={14} />
                        Limpar
                      </S.SecondaryButton>
                    </S.FilterActions>
                  </S.FilterFormLayout>
                </S.StyledForm>
              </S.FilterContainer>
            </Collapsible.Content>
          </Collapsible.Root>
          
          <S.Button onClick={handleCreatePlayer}>Adicionar Jogador</S.Button>
        </div>
      </S.Header>

      {isLoading ? (
        <div>Carregando jogadores...</div>
      ) : error ? (
        <div>Erro ao carregar jogadores. Por favor, tente novamente.</div>
      ) : players && players.length > 0 ? (
        <S.CardGrid>
          {players.map((player) => (
            <PlayerCard 
              key={player.id}
              player={player}
              onEdit={handleEditPlayer}
            />
          ))}
        </S.CardGrid>
      ) : (
        <S.EmptyState>Nenhum jogador encontrado</S.EmptyState>
      )}
    </S.Container>
  );
};

export default PlayerListPage; 