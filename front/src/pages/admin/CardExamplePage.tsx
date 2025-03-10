import React from 'react';
import styled from 'styled-components';
// import PageHeader from '../../components/PageHeader';
import PlayerCard from '../../components/cards/PlayerCard';
import MatchCard from '../../components/cards/MatchCard';
import { SessionStatus } from '@futebass-ia/constants';

// PageHeader simplificado
const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div>
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

// Dados de exemplo para os cartões
const examplePlayer = {
  id: 1,
  name: 'João Silva',
  cpf: '123.456.789-00',
  type: 'PLAYER',
  position: 'GOALKEEPER',
  phone: '(11) 99999-9999',
  email: 'joao.silva@exemplo.com',
  status: 'ACTIVE',
  imageUrl: 'https://via.placeholder.com/150',
  notes: 'Jogador experiente com 10 anos de carreira.',
  createdAt: new Date().toISOString(),
};

const exampleMatch = {
  id: 1,
  date: new Date().toISOString(),
  location: 'Campo Municipal de São Paulo',
  status: SessionStatus.SCHEDULED,
  notes: 'Partida amistosa entre os times A e B. É importante chegar com antecedência para o aquecimento.',
  teamA: {
    id: 1,
    name: 'Leões do Norte',
    color: '#FF5722'
  },
  teamB: {
    id: 2,
    name: 'Águias do Sul',
    color: '#2196F3'
  }
};

// Estilos para a página
const PageContainer = styled.div`
  padding: 24px;
`;

const SectionTitle = styled.h2`
  margin: 32px 0 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const ExampleContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
`;

const ExampleTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Componente de página
const CardExamplePage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Exemplos de Componentes"
        subtitle="Visualização dos componentes PlayerCard e MatchCard"
      />

      <SectionTitle>Exemplos de PlayerCard</SectionTitle>
      <ExampleContainer>
        <ExampleTitle>Visualização Completa</ExampleTitle>
        <PlayerCard player={examplePlayer} />
      </ExampleContainer>

      <ExampleContainer>
        <ExampleTitle>Visualização Compacta</ExampleTitle>
        <PlayerCard player={examplePlayer} viewMode="compact" />
      </ExampleContainer>

      <ExampleContainer>
        <ExampleTitle>Múltiplos Cards (Grid)</ExampleTitle>
        <CardsContainer>
          <PlayerCard player={examplePlayer} />
          <PlayerCard
            player={{
              ...examplePlayer,
              id: 2,
              name: 'Maria Oliveira',
              position: 'STRIKER',
              email: 'maria.oliveira@exemplo.com',
            }}
          />
          <PlayerCard
            player={{
              ...examplePlayer,
              id: 3,
              name: 'Pedro Santos',
              position: 'DEFENDER',
              email: 'pedro.santos@exemplo.com',
            }}
          />
        </CardsContainer>
      </ExampleContainer>

      <SectionTitle>Exemplos de MatchCard</SectionTitle>
      <ExampleContainer>
        <ExampleTitle>Visualização Padrão</ExampleTitle>
        <MatchCard match={exampleMatch} onEdit={(id) => alert(`Editar partida ${id}`)} />
      </ExampleContainer>

      <ExampleContainer>
        <ExampleTitle>Diferentes Status</ExampleTitle>
        <CardsContainer>
          <MatchCard
            match={{
              ...exampleMatch,
              id: 2,
              status: SessionStatus.SCHEDULED,
              location: 'Campo A - Pacaembu',
            }}
          />
          <MatchCard
            match={{
              ...exampleMatch,
              id: 3,
              status: SessionStatus.COMPLETED,
              location: 'Campo B - Morumbi',
            }}
          />
          <MatchCard
            match={{
              ...exampleMatch,
              id: 4,
              status: SessionStatus.CANCELED,
              location: 'Campo C - Allianz Parque',
              notes: 'Partida cancelada devido à chuva forte.'
            }}
          />
        </CardsContainer>
      </ExampleContainer>
    </PageContainer>
  );
};

export default CardExamplePage; 