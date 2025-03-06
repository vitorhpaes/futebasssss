import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreatePlayerSessionDto {
  @ApiProperty({
    description: 'ID do usuário/jogador',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @ApiProperty({
    description: 'ID do time',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  teamId: number;

  @ApiProperty({
    description: 'Confirmação de presença',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  confirmed?: boolean;

  @ApiProperty({
    description: 'Número de gols marcados',
    example: 2,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  goals?: number;

  @ApiProperty({
    description: 'Número de assistências',
    example: 1,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  assists?: number;
}
