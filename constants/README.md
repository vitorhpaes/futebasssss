# @futebass-ia/constants

Este pacote contém constantes, enumeradores e utilitários compartilhados entre o front-end e o back-end do projeto Futebass IA.

## Estrutura do Pacote

O pacote está organizado da seguinte forma:

- **enums/**: Contém enumeradores e funções relacionadas
  - `userType.ts`: Tipos de usuário
  - `position.ts`: Posições de jogadores
  - `sessionStatus.ts`: Status de sessões
  - `options.ts`: Utilitários para transformar enums em options para UI

## Instalação

Como este pacote faz parte do monorepo, ele já está disponível para os projetos front-end e back-end através do Yarn Workspaces.

## Conteúdo

### Enumeradores

O pacote contém os seguintes enumeradores:

- `UserType`: Tipos de usuário (PLAYER, ADMIN)
- `Position`: Posições de jogadores (GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD)
- `SessionStatus`: Status de sessões (SCHEDULED, COMPLETED, CANCELED)

### Mapas de Labels

Cada enumerador possui um mapa correspondente que associa os valores do enum a labels amigáveis em português:

- `userTypeMap`: Mapa para UserType
- `positionMap`: Mapa para Position
- `sessionStatusMap`: Mapa para SessionStatus

### Opções para Componentes de UI

Cada enumerador possui constantes e funções para gerar opções para componentes de UI:

- Constantes prontas: `USER_TYPE_OPTIONS`, `POSITION_OPTIONS`, `SESSION_STATUS_OPTIONS`
- Funções geradoras: `getUserTypeOptions()`, `getPositionOptions()`, `getSessionStatusOptions()`

### Utilitários

- `generateEnumOptions()`: Função genérica para gerar opções a partir de um enum e um mapa de labels
- `findEnumOption()`: Função para encontrar uma opção específica em uma lista de opções

## Uso no Front-end

```tsx
import { 
  UserType, 
  Position,
  getUserTypeOptions,
  getPositionOptions,
  Option
} from '@futebass-ia/constants';

// Usando enumeradores
const adminUser = UserType.ADMIN;
const goalkeeperPosition = Position.GOALKEEPER;

// Usando opções para selects
const userTypeOptions = getUserTypeOptions();
const positionOptions = getPositionOptions();

// Usando opções com valores desabilitados
const positionOptionsWithDisabled = getPositionOptions([Position.GOALKEEPER]);

// Iterando sobre as opções com tipagem correta
userTypeOptions.map((option: Option<UserType>) => (
  <div key={option.value}>{option.label}</div>
));
```

## Uso no Back-end

```typescript
import { UserType, Position, SessionStatus } from '@futebass-ia/constants';

// Usando enumeradores em lógica de negócio
function canUserEditSession(userType: UserType, sessionStatus: SessionStatus): boolean {
  if (userType === UserType.ADMIN) {
    return true;
  }
  
  if (userType === UserType.PLAYER && sessionStatus === SessionStatus.SCHEDULED) {
    return true;
  }
  
  return false;
}

// Exemplo para obter labels
function getUserTypeLabel(userType: UserType): string {
  switch (userType) {
    case UserType.PLAYER:
      return 'Jogador';
    case UserType.ADMIN:
      return 'Administrador';
    default:
      return 'Desconhecido';
  }
}
``` 