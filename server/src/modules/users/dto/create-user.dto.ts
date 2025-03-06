import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Nome do Usuário',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Tipo de usuário',
    example: 'PLAYER',
    enum: UserType,
    default: UserType.PLAYER,
  })
  @IsEnum(UserType)
  @IsOptional()
  type?: UserType;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Posição do jogador',
    example: 'Zagueiro',
    enum: ['Zagueiro', 'Meio-campista', 'Atacante'],
  })
  @IsString()
  @IsOptional()
  position?: string;
}
