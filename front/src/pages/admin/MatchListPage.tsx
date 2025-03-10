import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMatches } from '../../services/matches/matches.queries';
import { formatDateTime } from '../../utils/date-utils';
import { SessionStatus, sessionStatusMap } from '@futebass-ia/constants';
import { FiPlus, FiCalendar, FiMapPin, FiUsers, FiEdit } from 'react-icons/fi';
import Alert from '../../components/ui/Alert';
import * as S from './MatchListPage.styles';

// Componente para a página de listagem de partidas
const MatchListPage = () => {
  // Estado para filtros, se necessário no futuro
  const [filter] = useState({});
  
  // Usar o hook de query para buscar partidas
  const { data: matches, isLoading, error } = useMatches(filter);

  // Função para obter o label do status a partir do mapa
  const getStatusLabel = (status: string): string => {
    const sessionStatus = status as SessionStatus;
    return sessionStatusMap.get(sessionStatus) || status;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Partidas</S.Title>
        <Link to="/admin/matches/create">
          <S.Button>
            <FiPlus size={16} style={{ marginRight: '8px' }} />
            Criar Nova Partida
          </S.Button>
        </Link>
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
        <S.TableContainer>
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeaderCell>
                  <FiCalendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Data
                </S.TableHeaderCell>
                <S.TableHeaderCell>
                  <FiMapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Local
                </S.TableHeaderCell>
                <S.TableHeaderCell>
                  <FiUsers size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Times
                </S.TableHeaderCell>
                <S.TableHeaderCell>Status</S.TableHeaderCell>
                <S.TableHeaderCell>Anotações</S.TableHeaderCell>
                <S.TableHeaderCell>Ações</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {matches && matches.map((match) => (
                <S.TableRow key={match.id}>
                  <S.TableCell>{formatDateTime(match.date)}</S.TableCell>
                  <S.TableCell>{match.location}</S.TableCell>
                  <S.TableCell>
                    {match.teamA?.name || 'Time A'} vs {match.teamB?.name || 'Time B'}
                  </S.TableCell>
                  <S.TableCell>
                    <S.StatusBadge $status={match.status}>
                      {getStatusLabel(match.status)}
                    </S.StatusBadge>
                  </S.TableCell>
                  <S.TableCell>{match.notes || '-'}</S.TableCell>
                  <S.TableCell>
                    <Link to={`/admin/matches/edit/${match.id}`}>
                      <S.ActionButton>
                        <FiEdit size={14} style={{ marginRight: '4px' }} />
                        Editar
                      </S.ActionButton>
                    </Link>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        </S.TableContainer>
      )}
    </S.Container>
  );
};

export default MatchListPage; 