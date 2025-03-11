import React, { useState, useRef, useEffect } from 'react';
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
import { FiFilter, FiX, FiUser, FiUsers, FiTag } from 'react-icons/fi';
import styled from 'styled-components';

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

const PlayerListPage: React.FC = () => {
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar a visibilidade dos filtros
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
  
  // Obter lista de usuários com React Query
  const { data: players, isLoading, error } = useUsers(formik.values);
  
  const handleClearFilters = () => {
    formik.resetForm();
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
                    <S.FilterTitle>Filtrar Jogadores</S.FilterTitle>
                    <S.SecondaryButton onClick={() => setIsFilterOpen(false)}>
                      <FiX size={14} />
                      Fechar
                    </S.SecondaryButton>
                  </S.FilterHeader>
                  
                  <S.StyledForm onSubmit={formik.handleSubmit}>
                    <S.FilterFormLayout>
                      <S.FormField name="name">
                        <S.FormLabel>
                          <FiUser size={14} />
                          Nome
                        </S.FormLabel>
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
                        <S.FormLabel>
                          <FiUsers size={14} />
                          Posição
                        </S.FormLabel>
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
                        <S.FormLabel>
                          <FiTag size={14} />
                          Tipo
                        </S.FormLabel>
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
          
          <S.Button onClick={handleCreatePlayer}>Adicionar Jogador</S.Button>
        </div>
      </S.Header>

      {isLoading ? (
        <S.LoadingContainer>
          <S.Spinner />
        </S.LoadingContainer>
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