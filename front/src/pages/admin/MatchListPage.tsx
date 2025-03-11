import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMatches } from '../../services/matches/matches.queries';
import { FiPlus, FiFilter, FiX } from 'react-icons/fi';
import Alert from '../../components/ui/Alert';
import * as S from './MatchListPage.styles';
import MatchCard from '../../components/cards/MatchCard';
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 16px 0;
`;

const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

// Componente para a página de listagem de partidas
const MatchListPage = () => {
  const navigate = useNavigate();
  // Estado para filtros, se necessário no futuro
  const [filter] = useState({});
  
  // Estado para controlar a visibilidade dos filtros
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Usar o hook de query para buscar partidas
  const { data: matches, isLoading, error } = useMatches(filter);

  // Função para manipular a edição de uma partida
  const handleEditMatch = (id: number) => {
    navigate(`/admin/matches/edit/${id}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Partidas</S.Title>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Collapsible.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger>
              <FiFilter size={16} />
              {isFilterOpen ? 'Ocultar Filtros' : 'Filtros'}
            </CollapsibleTrigger>
            
            <Collapsible.Content>
              <FilterContainer>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SecondaryButton onClick={() => setIsFilterOpen(false)}>
                    <FiX size={14} />
                    Fechar
                  </SecondaryButton>
                </div>
                {/* Implementar filtros no futuro */}
              </FilterContainer>
            </Collapsible.Content>
          </Collapsible.Root>
          
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
        <CardGrid>
          {matches && matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onEdit={handleEditMatch}
            />
          ))}
        </CardGrid>
      )}
    </S.Container>
  );
};

export default MatchListPage; 