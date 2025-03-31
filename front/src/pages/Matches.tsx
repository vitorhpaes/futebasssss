import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMatches, useDeleteMatchMutation } from '../services/matches/matches.queries';
import { MatchFilterParams } from '../services/matches/matches.interfaces';
import MatchCard from '../components/cards/MatchCard';
import { FiPlus } from 'react-icons/fi';
import { SessionStatus } from '@futebasssss-ia/constants';

// Estilos
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.background.paper};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.main};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active
        ? theme.colors.primary.dark
        : theme.colors.background.default};
  }
`;

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Matches: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<MatchFilterParams>({ upcoming: true });
  
  // Query para buscar as partidas
  const { data: matches, isLoading, error } = useMatches(filter);

  // Mutation para excluir partidas
  const deleteMatchMutation = useDeleteMatchMutation();
  
  // Função para navegar para a página de edição
  const handleEditMatch = (id: number) => {
    navigate(`/partidas/${id}`);
  };

  // Função para criar uma nova partida
  const handleCreateMatch = () => {
    navigate('/partidas/nova');
  };

  // Função para lidar com a exclusão de uma partida
  const handleDeleteMatch = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta partida?')) {
      deleteMatchMutation.mutate(id, {
        onSuccess: () => {
          // Exibir mensagem de sucesso
          alert('Partida excluída com sucesso!');
        },
        onError: (error) => {
          // Exibir mensagem de erro
          alert(`Erro ao excluir partida: ${error.message}`);
        }
      });
    }
  };

  // Função para atualizar os filtros
  const setFilterOption = (option: MatchFilterParams) => {
    setFilter(option);
  };

  if (isLoading) {
    return <div>Carregando partidas...</div>;
  }

  if (error) {
    return <div>Erro ao carregar partidas: {error.message}</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Partidas</Title>
        <CreateButton onClick={handleCreateMatch}>
          <FiPlus />
          Nova Partida
        </CreateButton>
      </Header>

      <FiltersContainer>
        <FilterButton
          $active={!!filter.upcoming}
          onClick={() => setFilterOption({ upcoming: true })}
        >
          Próximas
        </FilterButton>
        <FilterButton
          $active={!!filter.past}
          onClick={() => setFilterOption({ past: true })}
        >
          Passadas
        </FilterButton>
        <FilterButton
          $active={filter.status === SessionStatus.SCHEDULED}
          onClick={() => setFilterOption({ status: SessionStatus.SCHEDULED })}
        >
          Agendadas
        </FilterButton>
        <FilterButton
          $active={filter.status === SessionStatus.COMPLETED}
          onClick={() => setFilterOption({ status: SessionStatus.COMPLETED })}
        >
          Concluídas
        </FilterButton>
        <FilterButton
          $active={filter.status === SessionStatus.CANCELED}
          onClick={() => setFilterOption({ status: SessionStatus.CANCELED })}
        >
          Canceladas
        </FilterButton>
      </FiltersContainer>

      {matches && matches.length > 0 ? (
        <MatchesGrid>
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onEdit={handleEditMatch}
              onDelete={handleDeleteMatch}
            />
          ))}
        </MatchesGrid>
      ) : (
        <EmptyState>
          Nenhuma partida encontrada com os filtros atuais.
        </EmptyState>
      )}
    </Container>
  );
};

export default Matches; 