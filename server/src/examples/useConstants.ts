// Importando os enumeradores diretamente sem o pacote monorepo
// Isso é apenas um exemplo enquanto resolvemos a questão das importações

// No ambiente real, você usaria a importação abaixo:
// import { UserType, Position, SessionStatus } from '@futebasssss-ia/constants';

// Para fins de demonstração, vamos definir os enums localmente:
enum UserType {
  PLAYER = 'PLAYER',
  ADMIN = 'ADMIN',
}

enum Position {
  GOALKEEPER = 'GOALKEEPER',
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  FORWARD = 'FORWARD',
}

enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  // Exemplo de uso dos enumeradores no back-end

  // Usando enumeradores diretamente
  getUserTypeExample(): UserType {
    return UserType.PLAYER;
  }

  getPositionExample(): Position {
    return Position.GOALKEEPER;
  }

  getSessionStatusExample(): SessionStatus {
    return SessionStatus.SCHEDULED;
  }

  // Exemplo para obter labels
  getUserTypeLabel(userType: UserType): string {
    switch (userType) {
      case UserType.PLAYER:
        return 'Jogador';
      case UserType.ADMIN:
        return 'Administrador';
      default:
        return 'Desconhecido';
    }
  }

  getPositionLabel(position: Position): string {
    switch (position) {
      case Position.GOALKEEPER:
        return 'Goleiro';
      case Position.DEFENDER:
        return 'Defensor';
      case Position.MIDFIELDER:
        return 'Meio-campista';
      case Position.FORWARD:
        return 'Atacante';
      default:
        return 'Desconhecido';
    }
  }

  getSessionStatusLabel(status: SessionStatus): string {
    switch (status) {
      case SessionStatus.SCHEDULED:
        return 'Agendada';
      case SessionStatus.COMPLETED:
        return 'Finalizada';
      case SessionStatus.CANCELED:
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  }

  // Exemplo de uso em validação
  isValidUserType(userType: string): boolean {
    return Object.values(UserType).includes(userType as UserType);
  }

  isValidPosition(position: string): boolean {
    return Object.values(Position).includes(position as Position);
  }

  isValidSessionStatus(status: string): boolean {
    return Object.values(SessionStatus).includes(status as SessionStatus);
  }

  // Exemplo de uso em lógica de negócio
  canUserEditSession(
    userType: UserType,
    sessionStatus: SessionStatus,
  ): boolean {
    if (userType === UserType.ADMIN) {
      return true;
    }

    if (
      userType === UserType.PLAYER &&
      sessionStatus === SessionStatus.SCHEDULED
    ) {
      return true;
    }

    return false;
  }
}
