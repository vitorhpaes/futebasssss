import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUsers, FiUserCheck, FiStar } from 'react-icons/fi';
import { GiBeerStein } from 'react-icons/gi';
import { useMatch } from '../../services/matches/matches.queries';
import { usePlayersWithSessionData, useConfirmPlayerMutation, useUpdatePlayerSessionMutation } from '../../services/player-sessions/player-sessions.queries';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';
import { formatDateTime } from '../../utils/date-utils';
import { POSITION_OPTIONS } from '@futebasssss-ia/constants';
import Alert from '../../components/ui/Alert';
import * as S from './MatchManagePage.styles';
import { useToast } from '../../components/ui/Toast';
import { useFormik } from 'formik';
import MatchStats from '../../components/match/MatchStats';
import { SessionStatusButton } from '../../components/SessionStatusButton';

// Componentes extraídos
import FilterForm, { FilterParams } from '../../components/match/FilterForm';
import AllPlayersTab from '../../components/match/tabs/AllPlayersTab';
import ResenhaTab from '../../components/match/tabs/ResenhaTab';
import ConfirmedPlayersTab from '../../components/match/tabs/ConfirmedPlayersTab';

// Tipo de aba
type TabType = 'all' | 'confirmed' | 'resenha';

// Interface para o MatchTeam
interface MatchTeam {
  id: number;
  sessionId: number | null;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  captainId: number | null;
  captain: {
    id: number;
    user: {
      id: number;
      name: string;
    };
  } | null;
}

// Interface para o componente ConfirmedPlayersTab
interface MatchTeams {
  teamA?: MatchTeam;
  teamB?: MatchTeam;
}

const MatchManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const matchId = id ? parseInt(id, 10) : 0;
  const { data: match, isLoading: isLoadingMatch, error: matchError } = useMatch(matchId);
  const { data: allPlayersWithSessionData } = usePlayersWithSessionData(matchId);
  const confirmPlayerMutation = useConfirmPlayerMutation();
  const updatePlayerSessionMutation = useUpdatePlayerSessionMutation();
  const { showToast } = useToast();
  const filterRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerSession[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Opções para o select de posição
  const allPositionsOption = { value: '', label: 'Todas' };
  const positionOptions = [allPositionsOption, ...POSITION_OPTIONS];

  // Formik para gerenciar o formulário de filtro
  const formik = useFormik<FilterParams>({
    initialValues: {
      name: '',
      position: ''
    },
    onSubmit: () => {
      // Fechar o filtro após submeter
      setIsFilterOpen(false);
    }
  });

  // Memorizamos os times A e B a partir do array de times
  const { teamA, teamB } = useMemo(() => {
    const teamA = match?.teams[0];
    const teamB = match?.teams[1];
    return { teamA, teamB };
  }, [match]);

  // Função para renderizar o formulário de filtro
  const renderFilterForm = () => (
    <div ref={filterRef} style={{ marginBottom: '16px' }}>
      <FilterForm
        formik={formik}
        positionOptions={positionOptions}
        onClear={handleClearFilters}
        closeFilter={handleCloseFilter}
      />
    </div>
  );

  // Função para confirmar presença do jogador
  const handleConfirmPlayer = (userId: number, willPlay = true) => {
    confirmPlayerMutation.mutate(
      { sessionId: matchId, userId, willPlay },
      {
        onSuccess: () => {
          showToast(
            willPlay
              ? `Presença do jogador confirmada com sucesso!`
              : `Jogador marcado como resenha com sucesso!`,
            { type: 'success', duration: 3000 }
          );
        },
        onError: (error) => {
          console.error('Erro ao confirmar jogador:', error);
          showToast(
            `Erro ao confirmar: ${error.message || 'Tente novamente mais tarde.'}`,
            { type: 'error', duration: 5000 }
          );
        }
      }
    );
  };

  // Função para alternar entre jogo e resenha
  const handleTogglePlayerStatus = (userId: number, willPlay = true) => {
    // Buscar a sessão do jogador
    const playerSession = allPlayersWithSessionData?.find(ps => ps.userId === userId);

    if (playerSession && playerSession.id) {
      updatePlayerSessionMutation.mutate(
        {
          sessionId: matchId,
          userId,
          data: {
            willPlay
          }
        },
        {
          onSuccess: () => {
            showToast(
              willPlay
                ? `Jogador movido para lista de jogo!`
                : `Jogador movido para resenha!`,
              { type: 'success', duration: 3000 }
            );
          },
          onError: (error) => {
            console.error('Erro ao atualizar:', error);
            showToast(
              `Erro ao atualizar: ${error.message || 'Tente novamente mais tarde.'}`,
              { type: 'error', duration: 5000 }
            );
          }
        }
      );
    }
  };

  // Função para adicionar jogador ao time
  const handleAddToTeam = (userId: number, teamId: number | undefined) => {
    // Verificar se o teamId é undefined ou zero
    if (teamId === undefined || teamId <= 0) {
      showToast(
        `Não foi possível adicionar o jogador ao time. Time não configurado para esta partida.`,
        { type: 'error', duration: 5000 }
      );
      return;
    }

    // Buscar a sessão do jogador
    const playerSession = allPlayersWithSessionData?.find(ps => ps.userId === userId);

    if (playerSession) {
      // Garantir que o teamId é um número
      const validTeamId = Number(teamId);
      console.log('⚽ Enviando atualização com teamId:', validTeamId);

      updatePlayerSessionMutation.mutate(
        {
          sessionId: matchId,
          userId,
          data: {
            teamId: validTeamId
          }
        },
        {
          onSuccess: () => {
            // Encontrar o time pelo ID para exibir o nome
            const teamName = validTeamId === teamA?.id
              ? teamA?.name
              : validTeamId === teamB?.id
                ? teamB?.name
                : 'time';

            showToast(
              `Jogador adicionado ao ${teamName || 'time'} com sucesso!`,
              { type: 'success', duration: 3000 }
            );
          },
          onError: (error) => {
            console.error('⚠️ Erro ao adicionar ao time:', error);
            showToast(
              `Erro ao adicionar ao time: ${error.message || 'Tente novamente mais tarde.'}`,
              { type: 'error', duration: 5000 }
            );
          }
        }
      );
    }
  };

  // Voltar para a lista de partidas
  const handleBack = () => {
    navigate(-1);
  };

  // Limpar filtros
  const handleClearFilters = () => {
    formik.resetForm();
  };

  // Fechar filtro
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  // Função para atualizar o status da partida
  const handleStatusChange = (newStatus: string) => {
    // O componente SessionStatusButton já faz a chamada à API
    // Aqui podemos atualizar o cache do React Query se necessário
    console.log('Status atualizado:', newStatus);
  };

  // Formatar a data e hora da partida
  const date = match ? formatDateTime(match.date, 'DD/MM/YYYY') : '';
  const time = match ? formatDateTime(match.date, 'HH:mm') : '';

  // Fechar o filtro ao clicar fora
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

  // Filtrar jogadores baseado nos filtros e na aba ativa
  useEffect(() => {
    if (!allPlayersWithSessionData) return;

    // Primeiro filtramos por aba
    let filtered = [...allPlayersWithSessionData];

    if (activeTab === 'confirmed') {
      filtered = filtered.filter(p => p.confirmed && p.willPlay);
    } else if (activeTab === 'resenha') {
      filtered = filtered.filter(p => p.confirmed && !p.willPlay);
    }

    // Depois aplicamos os filtros de busca
    if (formik.values.name) {
      const searchName = formik.values.name.toLowerCase();
      filtered = filtered.filter(p =>
        p.user?.name?.toLowerCase().includes(searchName) || false
      );
    }

    if (formik.values.position) {
      filtered = filtered.filter(p =>
        p.user?.position === formik.values.position
      );
    }

    setFilteredPlayers(filtered);
  }, [allPlayersWithSessionData, formik.values, activeTab]);

  if (isLoadingMatch) {
    return <Alert message="Carregando informações da partida..." />;
  }

  if (matchError) {
    return <Alert type="error" message={`Erro ao carregar a partida: ${matchError.message}`} />;
  }

  if (!match) {
    return <Alert type="error" message="Partida não encontrada" />;
  }

  // Contadores para estatísticas
  const confirmedCount = allPlayersWithSessionData?.filter(p => p.confirmed && p.willPlay).length || 0;
  const resenhaCount = allPlayersWithSessionData?.filter(p => p.confirmed && !p.willPlay).length || 0;
  const pendingCount = allPlayersWithSessionData?.filter(p => !p.confirmed).length || 0;

  const teamAPlayers = filteredPlayers.filter(p => p.teamId === teamA?.id);
  const teamBPlayers = filteredPlayers.filter(p => p.teamId === teamB?.id);
  const unassignedPlayers = filteredPlayers.filter(p => !p.teamId);

  // Criar um objeto simplificado para passar ao componente ConfirmedPlayersTab
  const matchTeams: MatchTeams = {
    teamA,
    teamB
  };

  return (
    <S.Container>
      <S.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <S.ConfirmButton onClick={handleBack} style={{ background: 'transparent', color: '#666' }}>
            <FiArrowLeft size={16} />
            Voltar
          </S.ConfirmButton>
        </div>
      </S.Header>

      <S.MatchInfo>
        <S.MatchHeader>
          <S.MatchTitle>
            <FiCalendar size={14} />
            {formatDateTime(match.date)}
            <FiMapPin size={14} style={{ marginLeft: 8 }} />
            {match.location}
          </S.MatchTitle>
          <SessionStatusButton
            sessionId={match.id}
            currentStatus={match.status}
            onStatusChange={handleStatusChange}
          />
        </S.MatchHeader>

        <S.MatchDetails>
          <S.MatchDetail>
            <FiCalendar size={14} />
            {date}
          </S.MatchDetail>
          <S.MatchDetail>
            <FiClock size={14} />
            {time}
          </S.MatchDetail>
        </S.MatchDetails>

        <S.TeamsContainer>
          <S.TeamBlock>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <S.TeamName>{teamA?.name || 'Time A'}</S.TeamName>
              {teamA?.captain?.user && (
                <S.CaptainInfo>
                  <FiStar size={12} />
                  {teamA.captain.user.name}
                </S.CaptainInfo>
              )}
            </div>
          </S.TeamBlock>

          <S.VersusText>VS</S.VersusText>

          <S.TeamBlock>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <S.TeamName>{teamB?.name || 'Time B'}</S.TeamName>
              {teamB?.captain?.user && (
                <S.CaptainInfo>
                  <FiStar size={12} />
                  {teamB.captain.user.name}
                </S.CaptainInfo>
              )}
            </div>
          </S.TeamBlock>
        </S.TeamsContainer>

        {/* Estatísticas resumidas */}
        <MatchStats
          confirmedCount={confirmedCount}
          resenhaCount={resenhaCount}
          pendingCount={pendingCount}
        />
      </S.MatchInfo>

      {/* Abas de navegação */}
      <S.TabsContainer>
        <S.Tab
          $active={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        >
          <FiUsers size={16} />
          Todos
        </S.Tab>
        <S.Tab
          $active={activeTab === 'confirmed'}
          onClick={() => setActiveTab('confirmed')}
        >
          <FiUserCheck size={16} />
          Confirmados para Jogo
        </S.Tab>
        <S.Tab
          $active={activeTab === 'resenha'}
          onClick={() => setActiveTab('resenha')}
        >
          <GiBeerStein size={16} />
          Resenha
        </S.Tab>
      </S.TabsContainer>

      {/* Componentes de abas */}
      {activeTab === 'all' && (
        <AllPlayersTab
          filteredPlayers={filteredPlayers}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          handleConfirmPlayer={handleConfirmPlayer}
          handleTogglePlayerStatus={handleTogglePlayerStatus}
          confirmPlayerMutation={confirmPlayerMutation}
          renderFilterForm={renderFilterForm}
        />
      )}

      {activeTab === 'resenha' && (
        <ResenhaTab
          filteredPlayers={filteredPlayers}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          handleConfirmPlayer={handleConfirmPlayer}
          handleTogglePlayerStatus={handleTogglePlayerStatus}
          confirmPlayerMutation={confirmPlayerMutation}
          renderFilterForm={renderFilterForm}
        />
      )}

      {activeTab === 'confirmed' && (
        <ConfirmedPlayersTab
          filteredPlayers={filteredPlayers}
          teamAPlayers={teamAPlayers}
          teamBPlayers={teamBPlayers}
          unassignedPlayers={unassignedPlayers}
          match={matchTeams}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          handleAddToTeam={handleAddToTeam}
          renderFilterForm={renderFilterForm}
        />
      )}
    </S.Container>
  );
};

export default MatchManagePage; 