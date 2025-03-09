import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  TransformTrim,
  TransformTrimAndEmptyToUndefined,
} from '../../common/transformers/global-transformers';

export enum UserType {
  PLAYER = 'PLAYER',
  ADMIN = 'ADMIN',
}

export enum PlayerPosition {
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  FORWARD = 'FORWARD',
}

export class RegisterDto {
  @ApiProperty({
    example: 'usuario@exemplo.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @TransformTrim()
  email: string;

  @ApiProperty({ example: 'Nome do Usuário', description: 'Nome do usuário' })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  @TransformTrim()
  name: string;

  @ApiPropertyOptional({
    example: 'senha123',
    description:
      'Senha do usuário. Se não informada, uma senha temporária será gerada automaticamente',
  })
  @IsOptional()
  @IsString({ message: 'Senha deve ser uma string' })
  @TransformTrimAndEmptyToUndefined()
  password?: string;

  @ApiPropertyOptional({
    enum: UserType,
    default: UserType.PLAYER,
    description: 'Tipo de usuário',
  })
  @IsEnum(UserType, { message: 'Tipo deve ser PLAYER ou ADMIN' })
  @IsOptional()
  type?: UserType = UserType.PLAYER;

  @ApiPropertyOptional({
    example: '+5511999999999',
    description: 'Telefone do usuário',
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @TransformTrimAndEmptyToUndefined()
  phone?: string;

  @ApiPropertyOptional({
    enum: PlayerPosition,
    nullable: true,
    description: 'Posição do jogador',
  })
  @IsOptional()
  @IsEnum(PlayerPosition, {
    message: 'Posição deve ser DEFENDER, MIDFIELDER ou FORWARD',
  })
  @TransformTrimAndEmptyToUndefined()
  position?: PlayerPosition;

  @ApiPropertyOptional({
    example: 'Observações sobre o jogador',
    description: 'Observações sobre o usuário',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  @TransformTrimAndEmptyToUndefined()
  observations?: string;
}
