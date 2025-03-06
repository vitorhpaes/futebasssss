import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateGameResultDto {
  @ApiProperty({
    description: 'Placar do time A',
    example: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  teamAScore?: number;

  @ApiProperty({
    description: 'Placar do time B',
    example: 2,
    required: false,
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
