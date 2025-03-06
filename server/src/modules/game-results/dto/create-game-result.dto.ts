import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateGameResultDto {
  @ApiProperty({
    description: 'ID da sessão de jogo',
    example: 1,
  })
  @IsNumber()
  sessionId: number;

  @ApiProperty({
    description: 'ID do time A',
    example: 1,
  })
  @IsNumber()
  teamAId: number;

  @ApiProperty({
    description: 'ID do time B',
    example: 2,
  })
  @IsNumber()
  teamBId: number;

  @ApiProperty({
    description: 'Pontuação do time A',
    example: 3,
  })
  @IsNumber()
  @Min(0)
  scoreA: number;

  @ApiProperty({
    description: 'Pontuação do time B',
    example: 2,
  })
  @IsNumber()
  @Min(0)
  scoreB: number;

  @ApiProperty({
    description: 'ID do time vencedor (calculado automaticamente se não fornecido)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  winnerId?: number;
}
