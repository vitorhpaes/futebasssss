import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { PlayerPosition } from './register.dto';
import {
  TransformTrim,
  TransformTrimAndEmptyToNull,
} from '../../common/transformers/global-transformers';

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
    example: '+5511999999999',
    description: 'Telefone do usuário',
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @TransformTrimAndEmptyToNull()
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
  @TransformTrimAndEmptyToNull()
  position?: PlayerPosition;

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
