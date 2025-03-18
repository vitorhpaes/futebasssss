import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Position, UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { TransformTrimAndEmptyToNull } from 'src/common/transformers/global-transformers';

import { TransformTrim } from 'src/common/transformers/global-transformers';
import { POSITION_VALUES } from 'src/modules/users/dto/create-user.dto';

// Valores possíveis para o tipo de usuário
export const USER_TYPE_VALUES = ['PLAYER', 'ADMIN'];

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'usuario@exemplo.com',
    description: 'Email do usuário',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @TransformTrim()
  email?: string;

  @ApiPropertyOptional({
    example: 'Nome do Usuário',
    description: 'Nome do usuário',
  })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @TransformTrim()
  name?: string;

  @ApiPropertyOptional({
    description: 'Tipo de usuário',
    example: 'PLAYER',
    enum: USER_TYPE_VALUES,
  })
  @IsEnum(UserType)
  @IsOptional()
  type?: UserType;

  @ApiPropertyOptional({
    example: '+5511999999999',
    description: 'Telefone do usuário',
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @TransformTrimAndEmptyToNull()
  phone?: string;

  @ApiProperty({
    description: 'Posição do jogador',
    example: 'DEFENDER',
    enum: POSITION_VALUES,
  })
  @IsEnum(Position)
  @IsOptional()
  position?: Position;

  @ApiPropertyOptional({
    example: 'Observações sobre o jogador',
    description: 'Observações sobre o usuário',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  @TransformTrimAndEmptyToNull()
  observations?: string;
}
