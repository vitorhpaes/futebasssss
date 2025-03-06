import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateGameResultDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @ApiProperty({
    description: 'ID do time A',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  teamAId: number;

  @ApiProperty({
    description: 'ID do time B',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  teamBId: number;

  @ApiProperty({
    description: 'Placar do time A',
    example: 3,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  teamAScore?: number;

  @ApiProperty({
    description: 'Placar do time B',
    example: 2,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  teamBScore?: number;

  @ApiProperty({
    description: 'ID do time vencedor',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  winnerTeamId?: number;
}
