import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { UserType, Position } from '@prisma/client';

const POSITION_VALUES = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'];
const USER_TYPE_VALUES = ['PLAYER', 'ADMIN'];

export class UserEntity {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Nome do Usuário',
  })
  name: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty({
    description: 'Tipo de usuário',
    example: 'PLAYER',
    enum: USER_TYPE_VALUES,
  })
  type: UserType;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do usuário',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
  })
  phone: string;

  @ApiProperty({
    description: 'Posição do jogador',
    example: 'DEFENDER',
    enum: POSITION_VALUES,
    nullable: true,
  })
  position: Position | null;

  @ApiProperty({
    description: 'Observações sobre o usuário',
    example: 'Senha temporária gerada: abc123',
    nullable: true,
  })
  observations: string | null;

  @ApiProperty({ nullable: true, description: 'Data de exclusão lógica' })
  deletedAt: Date | null;
}
