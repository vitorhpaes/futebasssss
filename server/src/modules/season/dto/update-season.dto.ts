import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateSeasonDto {
  @ApiProperty({
    description: 'Data de início da temporada',
    example: '2023-01-01',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'Data de finalização da temporada',
    example: '2023-06-30',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Descrição da temporada',
    example: 'Temporada Futebasssss 2025/01',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
