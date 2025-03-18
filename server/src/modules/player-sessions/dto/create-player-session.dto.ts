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
    required: false,
  })
  @IsNumber()
  @IsOptional()
  teamId?: number;

  @ApiProperty({
    description: 'Confirmação de presença',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  confirmed?: boolean;

  @ApiProperty({
    description:
      'Indica se o jogador irá jogar (true) ou apenas participar da resenha (false)',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  willPlay?: boolean;

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
