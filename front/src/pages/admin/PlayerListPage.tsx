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

const PlayerListPage: React.FC = () => {
  const navigate = useNavigate();
  
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
      
      // Fazer a requisição com os filtros aplicados
      // Não precisa fazer nada específico aqui pois o useUsers
      // reagirá automaticamente à mudança em filterParams
    }
  });
  
  // Obter lista de usuários com React Query
  const { data: players, isLoading, error } = useUsers(formik.values);
  
  // Obter a label a partir do valor da posição
  const getPositionLabel = (position: string | null | undefined) => {
    if (!position) return '-';
    const option = positionOptions.find(opt => opt.value === position);
    return option ? option.label : position;
  };
  
  // Obter a label a partir do valor do tipo
  const getTypeLabel = (type: string | null | undefined) => {
    if (!type) return '-';
    const option = typeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  const handleClearFilters = () => {
    formik.resetForm();
  };

  const handleCreatePlayer = () => {
    navigate('/admin/players/create');
  };

  const handleEditPlayer = (id: number) => {
    navigate(`/admin/players/edit/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Jogadores</S.Title>
        <S.Button onClick={handleCreatePlayer}>Adicionar Jogador</S.Button>
      </S.Header>

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
                Limpar
              </S.SecondaryButton>
            </S.FilterActions>
          </S.FilterFormLayout>
        </S.StyledForm>
      </S.FilterContainer>

      {isLoading ? (
        <div>Carregando jogadores...</div>
      ) : error ? (
        <div>Erro ao carregar jogadores. Por favor, tente novamente.</div>
      ) : players && players.length > 0 ? (
        <S.CardGrid>
          {players.map((player) => (
            <S.Card key={player.id}>
              <S.CardHeader>
                <S.PlayerName>{player.name}</S.PlayerName>
                <S.Badge $type={player.type === 'ADMIN' ? 'ADMIN' : 'PLAYER'}>
                  {player.type === 'ADMIN' ? 'Admin' : 'Jogador'}
                </S.Badge>
              </S.CardHeader>
              
              <S.CardContent>
                <S.CardField>
                  <S.FieldLabel>Email</S.FieldLabel>
                  <S.FieldValue>{player.email}</S.FieldValue>
                </S.CardField>
                
                <S.CardField>
                  <S.FieldLabel>Posição</S.FieldLabel>
                  <S.FieldValue>{getPositionLabel(player.position)}</S.FieldValue>
                </S.CardField>
                
                <S.CardField>
                  <S.FieldLabel>Tipo</S.FieldLabel>
                  <S.FieldValue>{getTypeLabel(player.type)}</S.FieldValue>
                </S.CardField>
                
                <S.CardField>
                  <S.FieldLabel>Data de Cadastro</S.FieldLabel>
                  <S.FieldValue>{formatDate(player.createdAt)}</S.FieldValue>
                </S.CardField>
              </S.CardContent>
              
              <S.CardActions>
                <S.EditButton onClick={() => handleEditPlayer(player.id)}>
                  Editar
                </S.EditButton>
              </S.CardActions>
            </S.Card>
          ))}
        </S.CardGrid>
      ) : (
        <S.EmptyState>Nenhum jogador encontrado</S.EmptyState>
      )}
    </S.Container>
  );
};

export default PlayerListPage; 