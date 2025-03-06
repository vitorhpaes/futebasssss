import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Nome do Usuário',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Posição do jogador',
    example: 'Zagueiro',
    enum: ['Zagueiro', 'Meio-campista', 'Atacante'],
    required: false,
  })
  position?: string;
}
