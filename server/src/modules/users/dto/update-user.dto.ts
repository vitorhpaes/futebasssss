import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Position } from '@prisma/client';

const POSITION_VALUES = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'];

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Nome do Usuário',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Posição do jogador',
    example: 'DEFENDER',
    enum: POSITION_VALUES,
    required: false,
  })
  @IsEnum(Position)
  @IsOptional()
  position?: Position;
}
