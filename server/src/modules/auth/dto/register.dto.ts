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

export class RegisterDto {
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
    description:
      'Senha do usuário. Se não informada, uma senha temporária será gerada automaticamente',
    example: 'senha123',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    description: 'Tipo de usuário',
    example: 'PLAYER',
    enum: ['PLAYER', 'ADMIN'],
    default: 'PLAYER',
  })
  @IsEnum(UserType)
  @IsOptional()
  type?: UserType;
}
