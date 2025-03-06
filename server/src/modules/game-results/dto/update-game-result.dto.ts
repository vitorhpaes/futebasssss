import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateGameResultDto {
  @ApiProperty({
    description: 'Pontuação do time A',
    example: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  scoreA?: number;

  @ApiProperty({
    description: 'Pontuação do time B',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  scoreB?: number;

  @ApiProperty({
    description: 'ID do time vencedor (calculado automaticamente se não fornecido)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  winnerId?: number;
}
