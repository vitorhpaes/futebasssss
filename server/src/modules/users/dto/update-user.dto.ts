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
}
