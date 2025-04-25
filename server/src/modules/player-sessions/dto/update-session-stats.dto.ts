import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateSessionStatsDto {
  @ApiProperty({
    description: 'Número de gols marcados',
    example: 2,
    required: false,
  })
  @IsNumber()
  @Min(0)
  goals: number;

  @ApiProperty({
    description: 'Número de assistências',
    example: 1,
    required: false,
  })
  @IsNumber()
  @Min(0)
  assists: number;
}
