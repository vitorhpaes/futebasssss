import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUsers } from '../../services/users/users.queries';
import { UserFilterParams } from '../../services/users/users.interfaces';
import * as S from './PlayerListPage.styles';
import Select, { SelectOption } from '../../components/form/Select';

const PlayerListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterParams, setFilterParams] = useState<UserFilterParams>({});
  
  // Opções para os selects
  const positionOptions: SelectOption[] = [
    { value: '', label: 'Todas' },
    { value: 'GOALKEEPER', label: 'Goleiro' },
    { value: 'DEFENDER', label: 'Zagueiro' },
    { value: 'MIDFIELDER', label: 'Meio-campo' },
    { value: 'FORWARD', label: 'Atacante' }
  ];

  const typeOptions: SelectOption[] = [
    { value: '', label: 'Todos' },
    { value: 'PLAYER', label: 'Jogador' },
    { value: 'ADMIN', label: 'Administrador' }
  ];
  
  // Obter lista de usuários com React Query
  const { data: players, isLoading, error } = useUsers(filterParams);
  

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
      
      setFilterParams(filters);
    }
  });

  const handleClearFilters = () => {
    formik.resetForm();
    setFilterParams({});
  };

  const handleCreatePlayer = () => {
    navigate('/admin/players/create');
  };

  const handleEditPlayer = (id: number) => {
    navigate(`/admin/players/edit/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getPositionLabel = (position: string | null | undefined) => {
    if (!position) return 'Não informado';
    
    const positions = {
      GOALKEEPER: 'Goleiro',
      DEFENDER: 'Zagueiro',
      MIDFIELDER: 'Meio-campo',
      FORWARD: 'Atacante'
    };
    
    return positions[position as keyof typeof positions] || position;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Gerenciamento de Jogadores</S.Title>
        <S.Button onClick={handleCreatePlayer}>+ Adicionar Jogador</S.Button>
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
                  value={formik.values.position}
                  onValueChange={(value) => formik.setFieldValue('position', value)}
                />
              </div>
            </S.FormField>

            <S.FormField name="type">
              <S.FormLabel>Tipo</S.FormLabel>
              <div style={{ marginTop: 2 }}>
                <Select
                  name="type"
                  options={typeOptions}
                  value={formik.values.type}
                  onValueChange={(value) => formik.setFieldValue('type', value)}
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
        <p>Carregando jogadores...</p>
      ) : error ? (
        <div>
          <p>Erro ao carregar jogadores</p>
          <p style={{ color: 'red', fontSize: '12px' }}>
            {error?.message || 'Erro desconhecido'}
          </p>
          <button onClick={() => setFilterParams({})}>Tentar novamente</button>
        </div>
      ) : !players || players.length === 0 ? (
        <S.EmptyState>
          <p>Nenhum jogador encontrado.</p>
        </S.EmptyState>
      ) : (
        <S.CardGrid>
          {players.map((player) => (
            <S.Card key={player.id}>
              <S.CardHeader>
                <S.PlayerName>{player.name}</S.PlayerName>
                <S.Badge $type={player.type}>
                  {player.type === 'ADMIN' ? 'Admin' : 'Jogador'}
                </S.Badge>
              </S.CardHeader>
              
              <S.CardContent>
                <S.CardField>
                  <S.FieldLabel>Email</S.FieldLabel>
                  <S.FieldValue>{player.email}</S.FieldValue>
                </S.CardField>
                
                <S.CardField>
                  <S.FieldLabel>Telefone</S.FieldLabel>
                  <S.FieldValue>{player.phone || 'Não informado'}</S.FieldValue>
                </S.CardField>
                
                {player.position && (
                  <S.CardField>
                    <S.FieldLabel>Posição</S.FieldLabel>
                    <S.FieldValue>
                      {getPositionLabel(player.position)}
                    </S.FieldValue>
                  </S.CardField>
                )}
                
                <S.CardField>
                  <S.FieldLabel>Criado em</S.FieldLabel>
                  <S.FieldValue>{formatDate(player.createdAt)}</S.FieldValue>
                </S.CardField>
                
                {player.observations && (
                  <S.CardField>
                    <S.FieldLabel>Observações</S.FieldLabel>
                    <S.FieldValue>{player.observations}</S.FieldValue>
                  </S.CardField>
                )}
              </S.CardContent>
              
              <S.CardActions>
                <S.EditButton onClick={() => handleEditPlayer(player.id)}>
                  Editar
                </S.EditButton>
              </S.CardActions>
            </S.Card>
          ))}
        </S.CardGrid>
      )}
    </S.Container>
  );
};

export default PlayerListPage; 