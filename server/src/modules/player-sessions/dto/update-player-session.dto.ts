import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePlayerSessionDto {
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
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  confirmed?: boolean;

  @ApiProperty({
    description:
      'Indica se o jogador irá jogar (true) ou apenas participar da resenha (false)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  willPlay?: boolean;

  @ApiProperty({
    description: 'Número de gols marcados',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  goals?: number;

  @ApiProperty({
    description: 'Número de assistências',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  assists?: number;
}
