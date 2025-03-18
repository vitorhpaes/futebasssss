import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiCheckCircle, FiCoffee, FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { useMatch } from '../../services/matches/matches.queries';
import { usePlayersWithSessionData, useConfirmPlayerMutation } from '../../services/player-sessions/player-sessions.queries';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';
import { formatDateTime } from '../../utils/date-utils';
import { Position, sessionStatusMap, POSITION_OPTIONS } from '@futebass-ia/constants';
import Alert from '../../components/ui/Alert';
import * as S from './MatchManagePage.styles';
import { useToast } from '../../components/ui/Toast';
import Select from '../../components/form/Select';
import { useFormik, FormikProps } from 'formik';

// Adicionar tipos ao componente FilterForm
interface FilterFormProps {
  formik: FormikProps<FilterParams>;
  positionOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  onClear: () => void;
  closeFilter: () => void;
}

// Adicionar estilos inline para utilizar o tema existente
const FilterForm = ({
  formik,
  positionOptions,
  statusOptions,
  onClear,
  closeFilter
}: FilterFormProps) => (
  <S.MatchInfo style={{ marginBottom: '8px' }}>
    <S.MatchHeader>
      <S.MatchTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FiFilter size={16} />
        Filtros
      </S.MatchTitle>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <S.ConfirmButton
          onClick={onClear}
          style={{ background: 'transparent', color: '#666' }}
        >
          <FiX size={14} />
          Limpar
        </S.ConfirmButton>
        
        <S.ConfirmButton
          onClick={closeFilter}
          style={{ background: 'transparent', color: '#666' }}
        >
          <FiX size={14} />
          Fechar
        </S.ConfirmButton>
      </div>
    </S.MatchHeader>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
      <div>
        <label htmlFor="name" style={{ fontSize: '14px', marginBottom: '4px', display: 'block', color: '#666' }}>
          <FiSearch size={14} style={{ marginRight: '4px' }} />
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
          placeholder="Buscar por nome"
        />
      </div>
      
      <div>
        <label htmlFor="position" style={{ fontSize: '14px', marginBottom: '4px', display: 'block', color: '#666' }}>
          <FiMapPin size={14} style={{ marginRight: '4px' }} />
          Posição
        </label>
        <Select
          name="position"
          options={positionOptions}
          value={formik.values.position}
          onValueChange={(value) => formik.setFieldValue('position', value)}
          placeholder="Todas"
        />
      </div>
      
      <div>
        <label htmlFor="status" style={{ fontSize: '14px', marginBottom: '4px', display: 'block', color: '#666' }}>
          <FiCheckCircle size={14} style={{ marginRight: '4px' }} />
          Status
        </label>
        <Select
          name="status"
          options={statusOptions}
          value={formik.values.status}
          onValueChange={(value) => formik.setFieldValue('status', value)}
          placeholder="Todos"
        />
      </div>
    </div>
  </S.MatchInfo>
);

interface FilterParams {
  name: string;
  position: Position | '';
  status: 'all' | 'confirmed' | 'resenha' | 'pending';
}

const MatchManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const matchId = id ? parseInt(id, 10) : 0;
  const filterRef = useRef<HTMLDivElement>(null);
  
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerSession[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Buscar informações da partida
  const { 
    data: match, 
    isLoading: isLoadingMatch, 
    error: matchError 
  } = useMatch(matchId);
  
  // Buscar jogadores relacionados a esta partida
  const {
    data: allPlayersWithSessionData,
    isLoading: isLoadingPlayers,
    error: playersError
  } = usePlayersWithSessionData(matchId);
  
  // Mutation para confirmar presença
  const confirmPlayerMutation = useConfirmPlayerMutation();

  // Opções para o select de posição
  const allPositionsOption = { value: '', label: 'Todas' };
  const positionOptions = [allPositionsOption, ...POSITION_OPTIONS];

  // Opções para o select de status
  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'confirmed', label: 'Confirmados' },
    { value: 'resenha', label: 'Resenha' },
    { value: 'pending', label: 'Pendentes' }
  ];

  // Formik para gerenciar o formulário de filtro
  const formik = useFormik<FilterParams>({
    initialValues: {
      name: '',
      position: '',
      status: 'all'
    },
    onSubmit: () => {
      // Fechar o filtro após submeter
      setIsFilterOpen(false);
    }
  });

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
            'success',
            3000
          );
        },
        onError: (error) => {
          console.error('Erro ao confirmar jogador:', error);
          showToast(
            `Erro ao confirmar: ${error.message || 'Tente novamente mais tarde.'}`,
            'error',
            5000
          );
        }
      }
    );
  };

  // Voltar para a lista de partidas
  const handleBack = () => {
    navigate('/admin/matches');
  };

  // Limpar filtros
  const handleClearFilters = () => {
    formik.resetForm();
  };

  // Fechar filtro
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
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

  // Filtrar jogadores baseado nos filtros
  useEffect(() => {
    if (allPlayersWithSessionData) {
      let filtered = [...allPlayersWithSessionData];
      
      // Filtrar por nome
      if (formik.values.name) {
        const searchName = formik.values.name.toLowerCase();
        filtered = filtered.filter(p => 
          p.user.name.toLowerCase().includes(searchName)
        );
      }
      
      // Filtrar por posição
      if (formik.values.position) {
        filtered = filtered.filter(p => 
          p.user.position === formik.values.position
        );
      }
      
      // Filtrar por status
      if (formik.values.status !== 'all') {
        if (formik.values.status === 'confirmed') {
          filtered = filtered.filter(p => p.confirmed && p.willPlay);
        } else if (formik.values.status === 'resenha') {
          filtered = filtered.filter(p => p.confirmed && !p.willPlay);
        } else if (formik.values.status === 'pending') {
          filtered = filtered.filter(p => !p.confirmed);
        }
      }
      
      setFilteredPlayers(filtered);
    }
  }, [allPlayersWithSessionData, formik.values]);

  // Se estiver carregando, mostrar spinner
  if (isLoadingMatch || isLoadingPlayers) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <S.Spinner />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  // Se houver erro, mostrar mensagem
  if (matchError || playersError) {
    return (
      <S.Container>
        <Alert
          type="error"
          title="Erro ao carregar dados"
          message="Ocorreu um erro ao carregar os dados da partida. Por favor, tente novamente."
        />
      </S.Container>
    );
  }

  // Se a partida não for encontrada
  if (!match) {
    return (
      <S.Container>
        <Alert
          type="error"
          title="Partida não encontrada"
          message="A partida solicitada não foi encontrada."
        />
      </S.Container>
    );
  }

  // Contadores para estatísticas
  const confirmedCount = filteredPlayers.filter(p => p.confirmed && p.willPlay).length;
  const resenhaCount = filteredPlayers.filter(p => p.confirmed && !p.willPlay).length;
  const pendingCount = filteredPlayers.filter(p => !p.confirmed).length;

  return (
    <S.Container>
      <S.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <S.ConfirmButton onClick={handleBack} style={{ background: 'transparent', color: '#666' }}>
            <FiArrowLeft size={16} />
            Voltar
          </S.ConfirmButton>
          <S.Title>Gerenciar Partida</S.Title>
        </div>
        <S.ConfirmButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FiFilter size={16} />
          {isFilterOpen ? 'Ocultar Filtros' : 'Filtrar Jogadores'}
        </S.ConfirmButton>
      </S.Header>

      <S.MatchInfo>
        <S.MatchHeader>
          <S.MatchTitle>
            <FiMapPin size={16} />
            {match.location}
          </S.MatchTitle>
          <S.StatusBadge $status={match.status}>
            {sessionStatusMap.get(match.status) || match.status}
          </S.StatusBadge>
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
            <S.TeamName>{match.teamA?.name || 'Time A'}</S.TeamName>
            <S.TeamColor $color={match.teamA?.color} />
          </S.TeamBlock>
          
          <S.VersusText>VS</S.VersusText>
          
          <S.TeamBlock>
            <S.TeamName>{match.teamB?.name || 'Time B'}</S.TeamName>
            <S.TeamColor $color={match.teamB?.color} />
          </S.TeamBlock>
        </S.TeamsContainer>

        {/* Estatísticas resumidas */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          marginTop: '16px', 
          padding: '8px', 
          background: '#f9f9f9', 
          borderRadius: '4px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2E7D32' }}>{confirmedCount}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Confirmados</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>{resenhaCount}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Resenha</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#757575' }}>{pendingCount}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Pendentes</div>
          </div>
        </div>
      </S.MatchInfo>

      {isFilterOpen && (
        <div ref={filterRef} style={{ marginBottom: '16px' }}>
          <FilterForm
            formik={formik}
            positionOptions={positionOptions}
            statusOptions={statusOptions}
            onClear={handleClearFilters}
            closeFilter={handleCloseFilter}
          />
        </div>
      )}

      <S.SectionTitle>
        Jogadores 
        {filteredPlayers.length > 0 && (
          <span style={{ fontWeight: 'normal', fontSize: '14px', marginLeft: '8px' }}>
            ({filteredPlayers.length} encontrados)
          </span>
        )}
      </S.SectionTitle>

      {filteredPlayers && filteredPlayers.length > 0 ? (
        <S.PlayerList>
          {filteredPlayers.map((ps) => {
            const isConfirmed = ps.confirmed;
            const isResenha = ps.confirmed && !ps.willPlay;
            
            return (
              <S.PlayerItem key={ps.userId}>
                <S.PlayerInfo>
                  <S.PlayerAvatar>
                    {ps.user?.name?.charAt(0).toUpperCase() || ''}
                  </S.PlayerAvatar>
                  <div>
                    <S.PlayerName>{ps.user?.name || 'Sem nome'}</S.PlayerName>
                    <S.PlayerPosition>
                      {ps.user?.position || 'Sem posição'}
                    </S.PlayerPosition>
                  </div>
                </S.PlayerInfo>
                <S.ActionSection>
                  {(isConfirmed) ? (
                    <S.PlayerStatus 
                      $confirmed={isConfirmed} 
                      $resenha={isResenha}
                    >
                      {isResenha ? 'Resenha' : 'Confirmado'}
                    </S.PlayerStatus>
                  ) : (
                    <S.PlayerActions>
                      <S.ConfirmButton 
                        onClick={() => handleConfirmPlayer(ps.userId, true)}
                        disabled={confirmPlayerMutation.isPending}
                        style={confirmPlayerMutation.isPending ? { cursor: 'wait', opacity: 0.7 } : {}}
                      >
                        <FiCheckCircle size={14} />
                        {confirmPlayerMutation.isPending ? 'Processando...' : 'Confirmado'}
                      </S.ConfirmButton>
                      <S.ResenhaButton 
                        onClick={() => handleConfirmPlayer(ps.userId, false)}
                        disabled={confirmPlayerMutation.isPending}
                        style={confirmPlayerMutation.isPending ? { cursor: 'wait', opacity: 0.7 } : {}}
                      >
                        <FiCoffee size={14} />
                        {confirmPlayerMutation.isPending ? 'Processando...' : 'Resenha'}
                      </S.ResenhaButton>
                    </S.PlayerActions>
                  )}
                </S.ActionSection>
              </S.PlayerItem>
            );
          })}
        </S.PlayerList>
      ) : (
        <Alert
          type="info"
          title="Nenhum jogador encontrado"
          message="Nenhum jogador disponível com os filtros selecionados."
        />
      )}
    </S.Container>
  );
};

export default MatchManagePage; 