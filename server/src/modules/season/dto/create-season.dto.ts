import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'Data de início da temporada',
    example: '2023-01-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Data de finalização da temporada',
    example: '2023-06-30',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Descrição da temporada',
    example: 'Temporada Futebasssss 2025/01',
  })
  @IsString()
  description: string;
}
