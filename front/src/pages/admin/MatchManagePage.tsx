import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiCheckCircle, FiCoffee, FiFilter, FiX, FiSearch, FiUsers, FiUserCheck } from 'react-icons/fi';
import { useMatch } from '../../services/matches/matches.queries';
import { usePlayersWithSessionData, useConfirmPlayerMutation, useUpdatePlayerSessionMutation } from '../../services/player-sessions/player-sessions.queries';
import { PlayerSession } from '../../services/player-sessions/player-sessions.interfaces';
import { formatDateTime } from '../../utils/date-utils';
import { Position, sessionStatusMap, POSITION_OPTIONS } from '@futebass-ia/constants';
import Alert from '../../components/ui/Alert';
import * as S from './MatchManagePage.styles';
import { useToast } from '../../components/ui/Toast';
import Select from '../../components/form/Select';
import { useFormik, FormikProps } from 'formik';

// Tipo de aba
type TabType = 'all' | 'confirmed' | 'resenha';

// Adicionar tipos ao componente FilterForm
interface FilterFormProps {
  formik: FormikProps<FilterParams>;
  positionOptions: Array<{ value: string; label: string }>;
  onClear: () => void;
  closeFilter: () => void;
}

// Adicionar estilos inline para utilizar o tema existente
const FilterForm = ({
  formik,
  positionOptions,
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
    </div>
  </S.MatchInfo>
);

interface FilterParams {
  name: string;
  position: Position | '';
}

// Componente para exibir detalhes do jogador
const PlayerItem = ({ 
  ps, 
  handleConfirmPlayer, 
  handleTogglePlayerStatus,
  confirmPlayerMutation 
}: { 
  ps: PlayerSession; 
  handleConfirmPlayer: (userId: number, willPlay: boolean) => void;
  handleTogglePlayerStatus: (userId: number, willPlay: boolean) => void;
  confirmPlayerMutation: { isPending: boolean };
}) => {
  const isConfirmed = ps.confirmed;
  const isResenha = ps.confirmed && !ps.willPlay;

  return (
    <S.PlayerItem key={ps.userId} $resenha={isResenha}>
      <S.PlayerInfo>
        <S.PlayerAvatar $resenha={isResenha}>
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
          // Se já está confirmado, mostrar status e botão para alternar
          <>
            <S.PlayerStatus 
              $confirmed={isConfirmed} 
              $resenha={isResenha}
            >
              {isResenha ? 'Resenha' : 'Confirmado'}
            </S.PlayerStatus>
            
            {/* Botão para alternar entre jogo e resenha */}
            {isResenha ? (
              <S.ConfirmButton 
                onClick={() => handleTogglePlayerStatus(ps.userId, true)}
                disabled={confirmPlayerMutation.isPending}
                style={{ 
                  marginLeft: '8px',
                  fontSize: '12px',
                  padding: '4px 8px'
                }}
              >
                <FiCheckCircle size={12} />
                Jogar
              </S.ConfirmButton>
            ) : (
              <S.ResenhaButton 
                onClick={() => handleTogglePlayerStatus(ps.userId, false)}
                disabled={confirmPlayerMutation.isPending}
                style={{ 
                  marginLeft: '8px',
                  fontSize: '12px',
                  padding: '4px 8px'
                }}
              >
                <FiCoffee size={12} />
                Resenha
              </S.ResenhaButton>
            )}
          </>
        ) : (
          // Se não está confirmado, mostrar botões de confirmação
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
};

// Interface para o tipo de equipe na partida
interface MatchTeam {
  id?: number;
  name?: string;
  color?: string;
}

// Interface para o componente Team
interface TeamProps {
  team: MatchTeam | null | undefined;
  players: PlayerSession[];
  handleAddToTeam?: (userId: number, teamId: number) => void;
}

// Componente para exibir um time com os jogadores
const TeamComponent = ({ team, players }: TeamProps) => {
  return (
    <S.TeamContainer>
      <S.TeamHeader $color={team?.color}>
        <span>{team?.name || 'Time'}</span>
        <span>{players.length} jogadores</span>
      </S.TeamHeader>
      
      <S.TeamPlayerList>
        {players.length > 0 ? (
          players.map(player => (
            <S.TeamPlayerItem key={player.userId}>
              <S.PlayerInfo>
                <S.PlayerAvatar>
                  {player.user?.name?.charAt(0).toUpperCase() || ''}
                </S.PlayerAvatar>
                <div>
                  <S.PlayerName>{player.user?.name || 'Sem nome'}</S.PlayerName>
                  <S.PlayerPosition>{player.user?.position || 'Sem posição'}</S.PlayerPosition>
                </div>
              </S.PlayerInfo>
            </S.TeamPlayerItem>
          ))
        ) : (
          <S.EmptyTeamMessage>
            Adicione jogadores a este time
          </S.EmptyTeamMessage>
        )}
      </S.TeamPlayerList>
    </S.TeamContainer>
  );
};

const MatchManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const matchId = id ? parseInt(id, 10) : 0;
  const filterRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState<TabType>('all');
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
  const updatePlayerMutation = useUpdatePlayerSessionMutation();

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

  // Função para alternar entre jogo e resenha
  const handleTogglePlayerStatus = (userId: number, willPlay = true) => {
    // Buscar a sessão do jogador
    const playerSession = allPlayersWithSessionData?.find(ps => ps.userId === userId);
    
    if (playerSession && playerSession.id) {
      updatePlayerMutation.mutate(
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
              'success',
              3000
            );
          },
          onError: (error) => {
            console.error('Erro ao atualizar:', error);
            showToast(
              `Erro ao atualizar: ${error.message || 'Tente novamente mais tarde.'}`,
              'error',
              5000
            );
          }
        }
      );
    }
  };

  // Função para adicionar jogador a um time
  const handleAddToTeam = (userId: number, teamId: number | undefined) => {
    console.log('⚽ Tentando adicionar jogador ao time:', { userId, teamId });
    
    // Verificar se o teamId é undefined ou zero
    if (teamId === undefined || teamId <= 0) {
      showToast(
        `Erro: ID do time inválido ou não definido (${teamId})`,
        'error',
        3000
      );
      return;
    }

    // Buscar a sessão do jogador
    const playerSession = allPlayersWithSessionData?.find(ps => ps.userId === userId);
    
    if (playerSession && playerSession.id) {
      // Garantir que o teamId é um número
      const validTeamId = Number(teamId);
      console.log('⚽ Enviando atualização com teamId:', validTeamId);
      
      updatePlayerMutation.mutate(
        { 
          sessionId: matchId, 
          userId, 
          data: {
            teamId: validTeamId
          }
        },
        {
          onSuccess: () => {
            showToast(
              `Jogador adicionado ao time com sucesso!`,
              'success',
              3000
            );
          },
          onError: (error) => {
            console.error('⚠️ Erro ao adicionar ao time:', error);
            showToast(
              `Erro ao adicionar ao time: ${error.message || 'Tente novamente mais tarde.'}`,
              'error',
              5000
            );
          }
        }
      );
    }
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
  const confirmedCount = allPlayersWithSessionData?.filter(p => p.confirmed && p.willPlay).length || 0;
  const resenhaCount = allPlayersWithSessionData?.filter(p => p.confirmed && !p.willPlay).length || 0;
  const pendingCount = allPlayersWithSessionData?.filter(p => !p.confirmed).length || 0;

  // Jogadores por time para a aba de confirmados
  const teamAPlayers = filteredPlayers.filter(p => p.teamId === match.teamA?.id);
  const teamBPlayers = filteredPlayers.filter(p => p.teamId === match.teamB?.id);
  const unassignedPlayers = filteredPlayers.filter(p => !p.teamId);

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

        {activeTab !== 'confirmed' && (
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
        )}

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
          <FiCoffee size={16} />
          Resenha
        </S.Tab>
      </S.TabsContainer>

      {/* Filtro e lista de jogadores - Apenas para aba 'Todos' e 'Resenha' */}
      {(activeTab === 'all' || activeTab === 'resenha') && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <S.SectionTitle>
              {activeTab === 'all' ? 'Jogadores' : 'Jogadores na Resenha'} 
              {filteredPlayers.length > 0 && (
                <span style={{ fontWeight: 'normal', fontSize: '14px', marginLeft: '8px' }}>
                  ({filteredPlayers.length} encontrados)
                </span>
              )}
            </S.SectionTitle>
            
            <S.ConfirmButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FiFilter size={16} />
              {isFilterOpen ? 'Ocultar Filtros' : 'Filtrar'}
            </S.ConfirmButton>
          </div>

          {isFilterOpen && (
            <div ref={filterRef} style={{ marginBottom: '16px' }}>
              <FilterForm
                formik={formik}
                positionOptions={positionOptions}
                onClear={handleClearFilters}
                closeFilter={handleCloseFilter}
              />
            </div>
          )}

          {filteredPlayers && filteredPlayers.length > 0 ? (
            <S.PlayerList>
              {filteredPlayers.map((ps) => (
                <PlayerItem 
                  key={ps.userId}
                  ps={ps} 
                  handleConfirmPlayer={handleConfirmPlayer}
                  handleTogglePlayerStatus={handleTogglePlayerStatus}
                  confirmPlayerMutation={confirmPlayerMutation}
                />
              ))}
            </S.PlayerList>
          ) : (
            <Alert
              type="info"
              title="Nenhum jogador encontrado"
              message="Nenhum jogador disponível com os filtros selecionados."
            />
          )}
        </>
      )}

      {/* Gerenciamento de times - Apenas para aba 'Confirmados' */}
      {activeTab === 'confirmed' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <S.SectionTitle>
              Distribuição de Times 
              {filteredPlayers.length > 0 && (
                <span style={{ fontWeight: 'normal', fontSize: '14px', marginLeft: '8px' }}>
                  ({filteredPlayers.length} jogadores confirmados)
                </span>
              )}
            </S.SectionTitle>
            
            <S.ConfirmButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FiFilter size={16} />
              {isFilterOpen ? 'Ocultar Filtros' : 'Filtrar'}
            </S.ConfirmButton>
          </div>

          {isFilterOpen && (
            <div ref={filterRef} style={{ marginBottom: '16px' }}>
              <FilterForm
                formik={formik}
                positionOptions={positionOptions}
                onClear={handleClearFilters}
                closeFilter={handleCloseFilter}
              />
            </div>
          )}

          {filteredPlayers && filteredPlayers.length > 0 ? (
            <div>
              {/* Times */}
              <S.TeamsGrid>
                <TeamComponent 
                  team={match.teamA} 
                  players={teamAPlayers}
                  handleAddToTeam={handleAddToTeam}
                />
                <TeamComponent 
                  team={match.teamB} 
                  players={teamBPlayers}
                  handleAddToTeam={handleAddToTeam}
                />
              </S.TeamsGrid>
              
              {/* Jogadores não atribuídos a times */}
              {unassignedPlayers.length > 0 && (
                <>
                  <S.SectionTitle style={{ marginTop: '32px', marginBottom: '16px' }}>
                    Jogadores sem time ({unassignedPlayers.length})
                  </S.SectionTitle>
                  
                  <S.UnassignedPlayersContainer>
                    {unassignedPlayers.map(player => (
                      <S.UnassignedPlayer key={player.userId}>
                        <S.PlayerInfo>
                          <S.PlayerAvatar>
                            {player.user?.name?.charAt(0).toUpperCase() || ''}
                          </S.PlayerAvatar>
                          <div>
                            <S.PlayerName>{player.user?.name || 'Sem nome'}</S.PlayerName>
                            <S.PlayerPosition>{player.user?.position || 'Sem posição'}</S.PlayerPosition>
                          </div>
                        </S.PlayerInfo>
                        <S.PlayerActions>
                          <S.ConfirmButton 
                            onClick={() => handleAddToTeam(player.userId, match.teamA?.id)}
                            disabled={!match.teamA?.id}
                          >
                            Time A
                          </S.ConfirmButton>
                          <S.ResenhaButton 
                            onClick={() => handleAddToTeam(player.userId, match.teamB?.id)}
                            disabled={!match.teamB?.id}
                          >
                            Time B
                          </S.ResenhaButton>
                        </S.PlayerActions>
                      </S.UnassignedPlayer>
                    ))}
                  </S.UnassignedPlayersContainer>
                </>
              )}
            </div>
          ) : (
            <Alert
              type="info"
              title="Nenhum jogador confirmado"
              message="Nenhum jogador foi confirmado para o jogo ainda."
            />
          )}
        </>
      )}
    </S.Container>
  );
};

export default MatchManagePage; 